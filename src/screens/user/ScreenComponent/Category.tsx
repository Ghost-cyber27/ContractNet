import { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { useNavigation, NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import { UserStackParamList } from "../../../types/types";
import { AntDesign } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../../../services/client";
import axios from "axios";
import { useAuthStore } from "../../../services/AuthContext";

type CheckoutScreenNavigationProp = RouteProp<UserStackParamList, 'Category'>;
type UserScreenNavigationProp = NavigationProp<UserStackParamList, 'Category'>;

type categoryData = {
    id: number;
    full_name: string;
    email: string;
    bio: string;
    profile_picture: string;
    category: string;
    rating: number;
    skills: [];
    verified: boolean;
};

export function Category(){
    const route = useRoute<CheckoutScreenNavigationProp>();
    const navigation = useNavigation<UserScreenNavigationProp>();
    const {name} = route.params;
    const token = useAuthStore((s) => s.token);
    const [catData, setCatData] = useState<categoryData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCategory = async() => {
        setLoading(true);
        try {
            const res = await api.get(`/users/category/${name}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) console.log("Unsuccessful fetch");

            console.log("Data: ", res.data);
            setCatData(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                console.error('API Error:', error.response.data); // <-- This is the key
                console.error('Status Code:', error.response.status);
                alert('User not found');
            } else {
                console.error('An unknown error occurred:', error);
            }
            throw error;
        }
    };

    useEffect(() => {
        fetchCategory();
        console.log("Category: ", name);
    },[]);

    return(
        <SafeAreaView style={styles.container}>
            {loading 
            ? <ActivityIndicator size={"large"} color={"#184d85"} /> 
            : <FlatList
                data={catData}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('profileDetails',
                        {
                            id: item.id,
                            full_name: item.full_name,
                            category: item.category,
                            bio: item.bio,
                            skills: item.skills,
                            profile_picture: item.profile_picture,
                            rating: item.rating,
                            verified: item.verified,
                            email: item.email
                        }
                    )}>
                        <Image 
                            source={require('../../../../assets/icons/Vynil Icons.png')}
                            //{uri: item.profile_picture}
                            style={styles.img}
                         />
                        <View style={styles.textView}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.nameText}>{item.full_name}</Text>
                                {item.verified 
                                    ? <AntDesign 
                                    name="check-circle" 
                                    size={20} 
                                    color='#184d85' 
                                    style={styles.verify}
                                    /> 
                                    : <View></View>}
                            </View>
                            <Text numberOfLines={0.5}>{item.email}</Text>
                            <Text>⭐{item.rating}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    card: {
        flexDirection: 'row',
        margin: 5,
        width: wp('95%'),
        height: hp('15%'),
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2
    },
    textView: {
        marginTop: hp('2%'),
        gap: hp('1%')
    },
    nameText: {
        fontSize: 20,
        fontWeight: '600'
    },
    img: {
        width: wp('40%'),
        height: hp('15%'),
        resizeMode: 'contain'
    },
    verify: {
        left: wp('2%'),
        top: hp('0.5%')
    }
});
