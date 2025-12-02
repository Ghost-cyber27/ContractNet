import { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Modal
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuthStore } from "../../services/AuthContext";
import { StatusBar } from "expo-status-bar";
import { CategoryData } from "../../utils/categoryData";

export default function MyJobs(){
    //const { user } = useAuthStore();
    const [isModal, setIsModal] = useState(false);
    const [seeAll, setSeeAll] = useState(false);
    const user = "Isaac";

    return(
        <ScrollView style={styles.container}>
            {/*Header*/}
            <View style={styles.topView}>
                <Text style={styles.welText}>Hello, {user} <AntDesign name="dollar" size={16} color='white'/></Text>
                <View style={styles.headerView}>
                    <View>
                        <Text style={styles.headerText}>Let's find the best</Text>
                        <Text style={styles.headerText}>talent for you</Text>
                    </View>
                    <TouchableOpacity style={styles.notiBtn} onPress={() => setIsModal(true)}>
                        <AntDesign name="bell" size={25} color='white'/>
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
                        <TouchableOpacity style={{gap: 5}}>
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
                <Text style={styles.categoryText}>My Jobs</Text>
                <View style={{backgroundColor: 'white'}}>
                    {CategoryData.map((item) => (
                    <TouchableOpacity key={item.id} style={{
                        flexDirection: 'row', 
                        margin: 5, 
                        backgroundColor: 'white',
                        width: wp('90%'),
                        height: hp('15%'),
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 6
                        }}>
                        <Image
                            source={item.icon}
                            style={styles.jobImg}
                        />
                        <View style={{flexDirection: 'row', right: wp('5%'), gap: wp('5%')}}>
                            <View>
                                <Text style={styles.jobTextHead}>Name of Job</Text>
                                <Text style={styles.jobText}>{item.name}</Text>
                            </View>
                            <View>
                                <Text style={styles.jobPrice}>$900,000</Text>
                                <Text style={styles.jobText}>Budget</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    ))}
                </View>
            </View>
            <StatusBar style="auto" />
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
                    <FlatList
                        data={CategoryData}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{
                                margin: 5,
                                width: wp('90%'),
                                height: hp('10%'),
                                borderRadius: 5,
                                justifyContent: 'center',
                                padding: 10,
                                backgroundColor: item.read ? 'white' : '#184d85',
                                elevation: 2
                            }}>
                                <View style={{
                                    
                                    flexDirection: 'row',
                                }}>
                                    <AntDesign name="notification" size={30} color={item.read ? 'black' : 'white'} />
                                    <View style={{padding: 5}}>
                                        <Text
                                            style={{
                                                color: item.read ? 'black' : 'white',
                                                fontSize: 16,
                                                fontWeight: item.read ? '300' : '500'
                                            }}
                                        >Message</Text>
                                        <Text
                                            style={{
                                                color: item.read ? 'black' : 'white',
                                                fontWeight: item.read ? '300' : '500'
                                            }}
                                        >time</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        style={styles.notiView}
                    />
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
                        <TouchableOpacity style={{gap: 5}}>
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
        flex: 1
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
        right: wp('5%')
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
    }
});