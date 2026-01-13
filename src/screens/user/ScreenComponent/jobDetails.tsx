import { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Modal,
    TextInput,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, RouteProp, useRoute, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { UserStackParamList } from "../../../types/types";
import { api } from "../../../services/client";
import { useAuthStore } from "../../../services/AuthContext";
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import axios from "axios";
import { users, truncate } from "../../../utils/functions";
import { AntDesign } from "@expo/vector-icons";

type DetailsScreenNavigationProp = RouteProp<UserStackParamList, 'JobDetails'>;

type GoBackScreenNavigationProp = NavigationProp<UserStackParamList, 'JobDetails'>;

type bidData = {
    id: number;
    job_id: number;
    freelancer_id: number;
    name: string;
    bid_amount: string;
    proposal: string;
    status: string;
    created_at: string;
};

type User = {
    id: number;
    full_name: string;
    email: string;
    bio: string;
    category: string;
    occupation: string;
    profile_picture: string | null;
    rating: number;
    role: string;
    skills: string;
}

//add verified in user model

export function JobDetails(){
    const [isVisible, setIsVisible] = useState(false);
    const [second, setSecond] = useState(false);
    const [bid, setBid] = useState<bidData[]>([]);
    const route = useRoute<DetailsScreenNavigationProp>();
    const { id, title, description, category, budget, deadline, status } = route.params;
    const navigation = useNavigation<GoBackScreenNavigationProp>();
    const token = useAuthStore().token;
    const [name, setName] = useState(title);
    const [des, setDes] = useState(description);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState(`${category}`);
    const [bud, setBud] = useState(budget);
    const [dead, setDead] = useState<Date>(deadline);
    const [dataLoad, setDataLoad] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [showText, setShowText] = useState(false);
    const [stats, setStats] = useState("");
    const [delLoad, setDelLoad] = useState(false);
    const [amount, setAmount] = useState('');
    const [proposal, setProposal] = useState('');
    const [freeUser, setFreeUser] = useState<User | null>(null);

    const categoryData = [
        { label: 'Select Category...', value: '1' },
        { label: 'Design & Creative', value: 'Design & Creative' },
        { label: 'Development & IT', value: 'Development & IT' },
        { label: 'Writing & Translation', value: 'Writing & Translation' },
        { label: 'Sales & Marketing', value: 'Sales & Marketing' },
        { label: 'Admin & Customer Support', value: 'Admin & Customer Support' },
        { label: 'Finance & Consulting', value: 'Finance & Consulting' },
        { label: 'Music & Audio', value: 'Music & Audio' },
    ];

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowPicker(false); 

        if (selectedDate) {
            setDead(selectedDate);
            console.log(selectedDate);
            setShowText(true);
        }
    };

    const fetchBid = async() => {
        setLoading(true);
        console.log('id: ', id);
        try {
            const res = await api.get(`/bids/job/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) console.log("Unsuccessful fetch of Bids");

            console.log('Bid Data: ', res.data);
            setBid(res.data);
            setLoading(false);

        } catch (err) {
            console.error("Error: ", err);
            if (axios.isAxiosError(err) && err.response) {
                console.error('API Error:', err.response.data); // <-- This is the key
                console.error('Status Code:', err.response.status);
            } else {
                console.error('An unknown error occurred:', err);
            }
            setLoading(false);
        }
    };

    const jobEdit = async() => {
        setDataLoad(true);
        try {
            const res = await api.put(`/jobs/${id}`,
                {
                    title: name,
                    category: value,
                    description: des,
                    budget: Number(bud),
                    deadline: dead
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) console.log("Unsuccessful update of Job");

            console.log('Updated Job Data: ', res.data);
            setDataLoad(false);

        } catch (error) {
            console.error("Error: ", error);
            setDataLoad(false);
        }
    };

    const deleteJob = async() => {
        setDelLoad(true);
        try {
            const res = await api.delete(`/jobs/${id}`, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) console.log("Unsuccessful");

            setDelLoad(false);
            alert("Successfully Deleted");
            navigation.goBack();
        } catch (error) {
            console.error(error);
            setDelLoad(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchBid();  // refresh every time screen is focused
            //fetchNotifications();
        }, [])
    );

    const proceedBid = async(id: number, stat: string, bid: string, pros: string) => {
        const info = await users(id);

        if (info) {
            setFreeUser(info);
            console.log('user box: ', freeUser);
            if (stat == "accepted" || stat == "pending") {
                setIsVisible(true);
                setAmount(bid);
                setProposal(pros);
                setStats(stat);
            }
        }
    };
    //for date date.split("T")[1].slice(0, 5)
    //.toISOString().split("T")[0]
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Job Details</Text>
            <View style={styles.detailView}>
                <Text style={styles.text}>Title:                                     {title}</Text>
                <Text style={styles.text}>Category:                              {category}</Text>
                <Text style={styles.text}>Description:                          {description}</Text>
                <Text style={styles.text}>Status:                                   {status}</Text>
                <Text style={styles.text}>Budget:                                 ₦{Number(budget)}</Text>
                <Text style={styles.text}>Deadline:                              {deadline.toString()}</Text>
            </View>
            <Text style={styles.header}>Bids</Text>
            {loading 
            ? <ActivityIndicator size={"large"} color={"blue"} />
            : <FlatList
                data={bid}
                renderItem={({item}) => (
                <TouchableOpacity style={styles.bidCard} onPress={() => proceedBid(item.freelancer_id ,item.status, item.bid_amount, item.proposal)}>
                    <View style={styles.bidRoll}>
                        <Image
                            source={require('../../../../assets/bid.jpg')}
                            style={styles.bidImg}
                        />
                        <Text style={styles.bidText}>{item.name}</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: '600'}}>Proposal</Text>
                        <Text>{truncate(item.proposal, 30)}</Text>
                        <Text><Text style={{fontSize: 16, fontWeight: '600'}}>Bid Amount:</Text> ₦{item.bid_amount}</Text>
                        <Text><Text style={{fontSize: 16, fontWeight: '600'}}>status:</Text> {item.status}</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            style={styles.bidView}
            ListFooterComponent={
                <>
                <View style={styles.btnView}>
                    <TouchableOpacity style={styles.btn} onPress={() => setSecond(true)}>
                        <Text style={styles.btnText}>Edit Job</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={() => deleteJob()}>
                        {delLoad 
                        ? <ActivityIndicator size={"large"} color={"white"} /> 
                        : <Text style={styles.btnText}>Delete Job</Text>
                        }
                    </TouchableOpacity>
                </View>
                </>
            }
            />
            }
            {/*Modal for Bid Details*/}
            <Modal
                visible={isVisible}
            >
                <View style={{
                    padding: 5,
                    marginTop: hp('10%'),
                    marginBottom: hp('5%')
                }}>
                    {/*Header*/}
                    <View style={{
                        flexDirection: 'row',
                        gap: wp('5%')
                    }}>
                        <Image
                            source={require('../../../../assets/icons/Vynil Icons.png')}
                            style={{
                                width: wp('30%'),
                                height: hp('15%'),
                                borderRadius: 50,
                                resizeMode: 'contain'
                            }}
                        />
                        <View style={{marginTop: hp('3%')}}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '500'
                            }}>{freeUser?.full_name}, {freeUser?.id && <AntDesign name="check-circle" color={'blue'} size={24} />}</Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '300'
                            }}>{freeUser?.occupation}</Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '300'
                            }}>⭐{freeUser?.id}</Text>
                        </View>
                    </View>
                    {/*Body*/}
                    <View style={{
                        padding: 5,
                        gap: hp('3%')
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '500'
                        }}>Bid Details</Text>
                        <View style={{
                            gap: hp('2%'),
                            padding: 10
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>Proposal</Text>
                            <Text>{proposal}</Text>
                            <Text style={{
                                fontSize: 16,
                            }}><Text style={{
                                fontWeight: 'bold'
                            }}>Bid Amount:</Text> ₦ {amount}</Text>
                            <Text style={{
                                fontSize: 16,
                            }}><Text style={{
                                fontWeight: 'bold'
                            }}>Status:</Text> Pending</Text>
                        </View>
                    </View>
                    {freeUser?.id && stats == 'pending' && (
                        <View style={{
                            flexDirection: 'row',
                            gap: wp('20%'),
                            marginTop: hp('5%'),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity style={styles.Abtn} onPress={() => navigation.navigate('Payment',
                                {
                                    job_id: id,
                                    receiver_id: freeUser?.id,
                                }
                                )}>
                                <Text style={styles.bText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Rbtn} onPress={() => alert('updates DB status')}>
                                <Text style={styles.bText}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={styles.bView}>
                        <TouchableOpacity style={styles.b} onPress={() => setIsVisible(false)}>
                            <Text style={styles.bt}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/*Modal for Job Edit*/}
            <Modal
                visible={second}
            >
                <ScrollView style={{
                    gap: hp('5%'),
                    padding: 10,
                    marginTop: hp('5%'),
                }}>
                    <View style={{
                        borderWidth: 2,
                        width: wp('95%'),
                        height: hp('10%'),
                        borderRadius: 10,
                        borderColor: '#184d85',
                        flexDirection: 'row',
                        padding: 5,
                        gap: wp('5%')
                    }}>
                        <TextInput
                            style={{
                                fontSize: 16,
                                width: wp('60%')
                            }}
                            placeholder={`${title}`}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={{
                        borderWidth: 2,
                        width: wp('95%'),
                        height: hp('10%'),
                        borderRadius: 10,
                        borderColor: '#184d85',
                        flexDirection: 'row',
                        padding: 5,
                        gap: wp('5%')
                    }}>
                        <Dropdown
                            style={{
                                height: hp('8%'),
                                width: wp('92%'),
                                borderRadius: 8,
                                paddingHorizontal: 8,
                            }}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={categoryData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder='Role'
                            value={value}
                            onChange={item => {
                                setValue(item.value);
                            }}
                        />
                    </View>
                    <View style={{
                        borderWidth: 2,
                        width: wp('95%'),
                        height: hp('10%'),
                        borderRadius: 10,
                        borderColor: '#184d85',
                        flexDirection: 'row',
                        padding: 5,
                        gap: wp('5%')
                    }}>
                        <TextInput
                            style={{
                                fontSize: 16,
                                width: wp('60%')
                            }}
                            placeholder={`${description}`}
                            onChangeText={(text) => setDes(text)}
                        />
                    </View>
                    <View style={{
                        borderWidth: 2,
                        width: wp('95%'),
                        height: hp('10%'),
                        borderRadius: 10,
                        borderColor: '#184d85',
                        flexDirection: 'row',
                        padding: 5,
                        gap: wp('5%')
                    }}>
                        <TextInput
                            style={{
                                fontSize: 16,
                                width: wp('60%')
                            }}
                            placeholder={`${budget}`}
                            keyboardType="number-pad"
                        />
                    </View>
                    <TouchableOpacity style={{
                        borderWidth: 2,
                        width: wp('95%'),
                        height: hp('10%'),
                        borderRadius: 10,
                        borderColor: '#184d85',
                        flexDirection: 'row',
                        padding: 5,
                        gap: wp('5%')
                    }}
                    onPress={() => setShowPicker(true)}
                    >
                        {showText 
                        ? <Text style={{
                            fontSize: 18,
                            fontWeight: '300',
                            top: hp('2%')
                        }}>Deadline: <Text style={{fontWeight: '600'}}>{dead.toDateString()}</Text> </Text>
                        : <Text style={{
                            fontSize: 18,
                            fontWeight: '300',
                            top: hp('2%')
                        }}>Select a Deadline</Text>
                        }
                        {showPicker && (
                            <DateTimePicker
                            value={dead}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                        width: wp('70%'),
                        height: hp('7%'),
                        backgroundColor: '#184d85',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        left: wp('13%'),
                    }}
                    onPress={() => jobEdit()}
                >
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: '500'
                    }}>Save Update</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{
                        width: wp('70%'),
                        height: hp('7%'),
                        backgroundColor: '#184d85',
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 5,
                        left: wp('13%'),
                    }}
                    onPress={() => setSecond(false)}
                >
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        fontWeight: '500'
                    }}>Go Back</Text>
                </TouchableOpacity>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white'
    },
    detailView: {
        width: wp('97%'),
        height: hp('35%'),
        borderWidth: 2,
        borderColor: '#184d85',
        borderRadius: 10,
        marginTop: hp('1%'),
        padding: 10,
        gap: hp('2%')
    },
    header: {
        fontSize: 20,
        fontWeight: '600'
    },
    text: {
        fontSize: 16,
        fontWeight: '400'
    },
    bidView: {
        padding: 5,
        gap: hp('1%'),
    },
    bidCard: {
        width: wp('90%'),
        height: hp('15%'),
        borderWidth: 2,
        margin: 5,
        padding: 5,
        borderColor: '#184d85',
        borderRadius: 10,
        flexDirection: 'row',
    },
    bidRoll: {
        flexDirection: 'row',
        gap: wp('2%')
    },
    bidImg: {
        width: wp('20%'),
        height: hp('8%'),
        resizeMode: 'cover'
    },
    bidText: {
        fontSize: 20,
        fontWeight: '400',
        marginTop: hp('0.5%')
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        //position: 'absolute',
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('2%')
    },
    btn2: {
        //position: 'absolute',
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#dd2020ff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('5%')
    },
    btnText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
    },
    Abtn: {
        width: wp('30%'),
        height: hp('5%'),
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    Rbtn: {
        width: wp('30%'),
        height: hp('5%'),
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    bText: {
        fontSize: 16,
        color: 'white'
    },
    bView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    b: {
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('5%')
    },
    bt: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white'
    },
});

/*
{freeUser.map((item) => 
                            (
                                
                            )
                        )}
 */