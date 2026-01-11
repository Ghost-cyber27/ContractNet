import { useState, useEffect, useCallback } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Modal, 
    ActivityIndicator
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuthStore } from "../../services/AuthContext";
import { CategoryData } from "../../utils/categoryData";
import { UserStackParamList } from "../../types/types";
import { useNavigation, NavigationProp, useFocusEffect } from "@react-navigation/native";
import { api } from "../../services/client";
import axios from 'axios';

type UserScreenNavigationProp = NavigationProp<UserStackParamList, 'UserTabs'>;

type JobData = {
    id: number;
    title: string;
    category: string;
    description: string;
    budget: number;
    deadline: Date;
    status: string;
};

type NotificationData = {
    id: number;
    message: string;
    is_read: boolean;
    created_at: Date;
};

export default function MyJobs(){
    const [isModal, setIsModal] = useState(false);
    const [seeAll, setSeeAll] = useState(false);
    const [data, setData] = useState<JobData[]>([]);
    const [nData, setNData] = useState<NotificationData[]>([]);
    const [dataLoading, setDataLoading] = useState(false);
    const navigation = useNavigation<UserScreenNavigationProp>();
    const token = useAuthStore().token;
    const [unread, setUnread] = useState<number>(3);

    const fetchJobs = async() => {
        setDataLoading(true);
        try {
            const res = await api.get('/jobs/me',
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log('Job Data: ', res.data);
            setData(res.data);
            setDataLoading(false);
        } catch (error) {
            console.error(error);
            setDataLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                console.error('API Error:', error.response.data); // <-- This is the key
                console.error('Status Code:', error.response.status);
            } else {
                console.error('An unknown error occurred:', error);
            }
            throw error;
        }
    };

    const fetchNotifications = async() => {
        try {
            const res = await api.get(`/notifications/${useAuthStore().user.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) console.log("Unsuccessful fetch of notification");

            setNData(res.data);
            const unreadCount = nData.filter(n => n.is_read === true).length;
            setUnread(unreadCount);
            console.log("Notification: ", res.data);
            console.log('unread Notifications: ', unreadCount);
        } catch (error) {
            console.error(error);
        }
    };

    const updateNotifications = async(id: number) => {
        try {
            const res = await api.get(`/notifications/${id}/read`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) console.log("Unsuccessful update of notification");

            setNData(res.data);
            console.log("Update Notification: ", res.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        //fetchJobs();
        //fetchNotifications();
    },[]);

    useFocusEffect(
        useCallback(() => {
            fetchJobs();  // refresh every time screen is focused
            //fetchNotifications();
        }, [])
    );

    return(
        <ScrollView style={styles.container}>
            {/*Header*/}
            <View style={styles.topView}>
                <Text style={styles.welText}>Hello, {useAuthStore().user.full_name} <AntDesign name="dollar" size={16} color='white'/></Text>
                <View style={styles.headerView}>
                    <View>
                        <Text style={styles.headerText}>Let's find the best</Text>
                        <Text style={styles.headerText}>talent for you</Text>
                    </View>
                    <TouchableOpacity style={styles.notiBtn} onPress={() => setIsModal(true)}>
                        <AntDesign name="bell" size={25} color='white'/>
                        {unread > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{unread}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            {/*Category*/}
            <View style={styles.categoryView}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.categoryText}>Service Category</Text>
                    <TouchableOpacity 
                    style={{left: wp('36%'), top: hp('1%')}}
                    onPress={() => setSeeAll(true)}
                    >
                        <Text style={{color: 'blue'}}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={CategoryData}
                    renderItem={({ item }) => (
                    <View style={{margin: 20}}>
                        <TouchableOpacity style={{gap: 5}} onPress={() => navigation.navigate('Category', {
                            name: item.name.replace('\n', ' '),
                            })}>
                            <Image source={item.icon} style={styles.categoryListImg}/>
                            <Text style={styles.categoryListText}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                    keyExtractor={(item) => item.id}
                    style={styles.categoryList}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>
            {/*My Job Section*/}
            <View style={styles.jobView}>
                <View style={{flexDirection: 'row', gap: wp('62%')}}>
                    <Text style={styles.categoryText}>My Jobs</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddJob')}>
                        <AntDesign name='plus-circle' size={25} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: 'white'}}>
                    
                    {dataLoading 
                    ? <ActivityIndicator size={"large"} color={"blue"} />
                    : data.map((item) => (
                    <TouchableOpacity key={item.id} style={{
                        flexDirection: 'row', 
                        margin: 5, 
                        backgroundColor: 'white',
                        width: wp('93%'),
                        height: hp('15%'),
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 6
                        }}
                        onPress={() => navigation.navigate('JobDetails', {
                            id: item.id,
                            title: item.title,
                            category: item.category,
                            description: item.description,
                            budget: item.budget,
                            deadline: item.deadline,
                            status: item.status,
                        })}
                        >
                        <Image
                            source={require('../../../assets/job.png')}
                            style={styles.jobImg}
                        />
                        <View style={{flexDirection: 'row', right: wp('5%'), gap: wp('5%')}}>
                            <View>
                                <Text style={styles.jobTextHead}>{item.title}</Text>
                                <Text style={styles.jobText}>{item.category}</Text>
                            </View>
                            <View>
                                <Text style={styles.jobPrice}>₦{item.budget}</Text>
                                <Text style={styles.jobText}>{item.deadline.toString()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    ))}
                </View>
            </View>
            {/*Modal for Notifications*/}
            <Modal
                visible={isModal}
            >
                <View style={styles.moalView}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Notifications</Text>
                        <TouchableOpacity style={styles.modalHeaderBtn} onPress={() => setIsModal(false)}>
                            <AntDesign name="close-circle" size={30} color='black' />
                        </TouchableOpacity>
                    </View>
                    {nData.length > 0 
                    ? <FlatList
                        data={nData}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{
                                margin: 5,
                                width: wp('90%'),
                                height: hp('10%'),
                                borderRadius: 5,
                                justifyContent: 'center',
                                padding: 10,
                                backgroundColor: item.is_read ? 'white' : '#184d85',
                                elevation: 2
                            }}
                            onPress={() => updateNotifications(item.id)}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <AntDesign name="notification" size={30} color={item.is_read ? 'black' : 'white'} />
                                    <View style={{padding: 5}}>
                                        <Text
                                            style={{
                                                color: item.is_read ? 'black' : 'white',
                                                fontSize: 16,
                                                fontWeight: item.is_read ? '300' : '500'
                                            }}
                                        >Message</Text>
                                        <Text
                                            style={{
                                                color: item.is_read ? 'black' : 'white',
                                                fontWeight: item.is_read ? '300' : '500'
                                            }}
                                        >time</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.notiView}
                    />
                    : <Text style={{ top: hp('45%'), fontSize: 24 }}>No Notifications</Text>
                    }
                </View>
            </Modal>
            {/*seeing all category*/}
            <Modal
                visible={seeAll}
            >
                <FlatList
                    data={CategoryData}
                    renderItem={({ item }) => (
                    <View style={{margin: 20}}>
                        <TouchableOpacity style={{gap: 5}} onPress={() => navigation.navigate('Category', {
                            name: item.name,
                            })}>
                            <Image source={item.icon} style={styles.categoryListImg}/>
                            <Text style={styles.categoryListText}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                    keyExtractor={(item) => item.id}
                    style={{
                        width: wp('100%'),
                        height: hp('52%'),
                        borderRadius: 10,
                        backgroundColor: 'white',
                        padding: 5,
                        margin: 20
                    }}
                    numColumns={2}
                    scrollEnabled={true}
                    ListFooterComponent={
                    <>
                        <TouchableOpacity 
                        style={{
                            width: wp('70%'),
                            height: hp('7%'),
                            backgroundColor: '#184d85',
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: 5,
                            left: wp('7%')
                        }}
                        onPress={() => setSeeAll(false)}
                        >
                            <Text style={{
                                fontSize: 20,
                                color: 'white',
                                fontWeight: '500'
                            }}>Cancel</Text>
                        </TouchableOpacity>
                    </>
                }
                />
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topView: {
        width: wp('200%'),
        height: hp('30%'),
        backgroundColor: '#184d85',
        padding: 5,
        gap: hp('5%')
    },
    welText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
        top: hp('5%')
    },
    headerView: {
        flexDirection: 'row',
        gap: wp('10%'),
        top: hp('5%')
    },
    headerText: {
        fontSize: 25,
        fontWeight: '700',
        color: 'white'
    },
    notiBtn: {
        borderWidth: 1,
        borderRadius: 50,
        width: wp('11%'),
        height: hp('6%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        left: wp('17%')
    },
    categoryView: {
        padding: 10
    },
    categoryText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    categoryList: {
        width: wp('100%'),
        height: hp('52%'),
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 5
    },
    categoryListText: {
        fontSize: 16,
        fontWeight: '500'
    },
    categoryListImg: {
        width: wp('30%'),
        height: hp('15%'),
        resizeMode: 'contain',
        borderRadius: 10,
    },
    jobView: {
        padding: 10
    },
    jobImg: {
        width: wp('30%'),
        height: hp('10%'),
        resizeMode: 'contain', 
    },
    jobText: {
        fontSize: 16
    },
    jobTextHead: {
        fontSize: 18,
        fontWeight: '500'
    },
    jobPrice: {
        color: 'green',
        fontSize: 16,
        fontWeight: '400'
    },
    moalView: {
        flex: 1,
        alignItems: 'center',
        margin: 5,
        padding: 5
    },
    modalHeader: {
        flexDirection: 'row',
    },
    modalHeaderText: {
        fontSize: 25,
        fontWeight: '600'
    },
    modalHeaderBtn: {
        left: wp('22%')
    },
    notiView: {
        padding: 10,
        backgroundColor: 'white',
        
    },
    notiTextView: {
        margin: 5,
        width: wp('90%'),
        height: hp('10%'),
        borderRadius: 5,
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 2
    },
    notiText: {
        fontSize: 16,
    },
    notiImg: {
        width: wp('30%'),
        height: hp('10%'),
        resizeMode: 'contain', 
        right: wp('5%')
    },
    badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
