import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Modal,
    TextInput,
    ScrollView
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AntDesign from '@expo/vector-icons/AntDesign';

export function JobDetails(){
    const [isVisible, setIsVisible] = useState(false);
    const [second, setSecond] = useState(false);
    const data = [
        {id: '1', name: 'DJ Oscar',proposal: 'jlsdlvjsd sldlv sdlv sdlv sldv', bid_amount: '20,000', status: 'Pending'},
        {id: '2', name: 'Malvin Kay',proposal: 'lksdlvk sd vlsd vlsdlv sdsdvlsd', bid_amount: '123,000', status: 'Rejected'},
        {id: '3', name: 'Jay Jay Kay',proposal: 'ldlsdlknlskdnvkdv sdkvdkl ddv', bid_amount: '100,000', status: 'Accepted'},
    ];
    const stats = 'Accept';

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Job Details</Text>
            <View style={styles.detailView}>
                <Text style={styles.text}>Title:                                     Web Development</Text>
                <Text style={styles.text}>Category:                              Development</Text>
                <Text style={styles.text}>Description:                          i want a website</Text>
                <Text style={styles.text}>Status:                                   Open</Text>
                <Text style={styles.text}>Budget:                                 $400,000</Text>
                <Text style={styles.text}>Deadline:                              12-05-2025</Text>
            </View>
            <Text style={styles.header}>Bids</Text>
            <FlatList
                data={data}
                renderItem={({item}) => (
                <TouchableOpacity style={styles.bidCard} onPress={() => setIsVisible(true)}>
                    <View style={styles.bidRoll}>
                        <Image
                            source={require('../../../../assets/icons/Vynil Icons.png')}
                            style={styles.bidImg}
                        />
                        <Text style={styles.bidText}>{item.name}</Text>
                    </View>
                    <Text style={{fontSize: 16}}>Proposal</Text>
                    <Text>{item.proposal}</Text>
                    <Text>Bid Amount: ${item.bid_amount}</Text>
                    <Text>status: {item.status}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            style={styles.bidView}
            />
            <View style={styles.btnView}>
                <TouchableOpacity style={styles.btn} onPress={() => setSecond(true)}>
                    <Text style={styles.btnText}>Edit Job</Text>
                </TouchableOpacity>
            </View>
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
                            }}>Full Name, verified</Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '300'
                            }}>Service</Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '300'
                            }}>Rating</Text>
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
                            <Text>khvkhvhfkhf ugg ug gkgug uguog ug</Text>
                            <Text style={{
                                fontSize: 16,
                            }}><Text style={{
                                fontWeight: 'bold'
                            }}>Bid Amount:</Text> $200,000</Text>
                            <Text style={{
                                fontSize: 16,
                            }}><Text style={{
                                fontWeight: 'bold'
                            }}>Status:</Text> Pending</Text>
                        </View>
                    </View>
                    {stats == 'Accept' && (
                        <View style={{
                            flexDirection: 'row',
                            gap: wp('20%'),
                            marginTop: hp('5%'),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <TouchableOpacity style={styles.Abtn}>
                                <Text style={styles.bText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Rbtn}>
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
                    marginTop: hp('5%')
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
                            placeholder="Title"
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
                            placeholder="Category"
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
                            placeholder="Description"
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
                            placeholder="Status"
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
                            placeholder="Bid Amount"
                            keyboardType="number-pad"
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
                            placeholder="Deadline"
                        />
                    </View>
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
                    onPress={() => console.log("Saved")}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: hp('10%'),
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
        marginBottom: hp('15%')
    },
    bidCard: {
        width: wp('90%'),
        height: hp('20%'),
        borderWidth: 2,
        margin: 5,
        padding: 5,
        borderColor: '#184d85',
        borderRadius: 10
    },
    bidRoll: {
        flexDirection: 'row',
        gap: wp('2%')
    },
    bidImg: {
        width: wp('10%'),
        height: hp('5%'),
        resizeMode: 'contain'
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
        position: 'absolute',
        width: wp('70%'),
        height: hp('10%'),
        backgroundColor: '#184d85',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp('20%')
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