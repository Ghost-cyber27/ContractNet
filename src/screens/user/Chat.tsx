import { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
 } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { AllChats } from "../../services/message";
import { AntDesign } from "@expo/vector-icons";
import { UserStackParamList } from "../../types/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useAuthStore } from "../../services/AuthContext";
import { users } from "../../utils/functions";
import { api } from "../../services/client";
import axios from "axios";

type UserScreenNavigationProp = NavigationProp<UserStackParamList, 'UserTabs'>;


// type Chats = {
//     id: number;
//     sender_id: number;
//     receiver_id: number;
//     job_id: number;
//     content: string;
//     is_read: boolean;
//     sent_at: string;
// };

interface Chat {
  other_user_id: number
  content: string
  is_read: boolean
  sent_at: string
}

export default function Chat(){
    const [message, setMessage] = useState<Chat[]>([]);
    const navigation = useNavigation<UserScreenNavigationProp>();
    const token = useAuthStore((s) => s.token);
    const myId = useAuthStore((s) => s.user.id);
    //add sender name
    useEffect(() => {
        const loadMessages = async() => {
            try {
                const res = await api.get('/messages/chats',
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );

                if(!res)return;

                console.log('Chats: ', res.data);
                setMessage(res.data);

            } catch (error) {
                console.error(error);
            }
        };

        loadMessages();
    }, []);

    const markRead = async() => {
        try {
            const res = await api.put(`/messages/mark-read/${myId}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if(!res) return;

            console.log(res.data);
            
        } catch (err) {
            console.error(err);
            if (axios.isAxiosError(err) && err.response) {
                console.error('API Error:', err.response.data); // <-- This is the key
                console.error('Status Code:', err.response.status);
            } else {
                console.error('An unknown error occurred:', err);
            }
        }
        
    }

    const nextScreen = (id: number) => {
        //markRead();
        navigation.navigate('chatDetails',{receiver_id: id});
    };

    return(
        <View style={styles.container}>
            {message.length > 0
            ? (
                <FlatList
                    data={message}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatView} onPress={() => nextScreen(item.other_user_id)}>
                            <View style={styles.img}>
                                <AntDesign name="message" size={30} color='black' />
                            </View>
                            <View>
                                <Text style={item.is_read ? styles.name : styles.unreadname}>User: {item.other_user_id}</Text>
                                <Text style={item.is_read ? styles.msg : styles.unreadmsg} numberOfLines={1}>{item.content}</Text>
                            </View>
                            <Text style={item.is_read ? styles.time : styles.unreadtime}>{item.sent_at.split("T")[1].slice(0, 5)}</Text>
                        </TouchableOpacity>
                    )}
                    //keyExtractor={(item) => item.id.toString()}
                />
                )
                : (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: '400'}}>No Chat ......</Text>
                    </View>
                ) 
            }
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    chatView: {
        margin: 5,
        padding: 5,
        top: hp('2%'),
        backgroundColor: 'white',
        flexDirection: 'row',
        elevation: 2,
        borderRadius: 5
    },
    img: {
        width: wp('15%'),
        height: hp('7%'),
        borderRadius: 50,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: '300'
    },
    msg: {
        fontSize: 14,
        fontWeight: '300'
    },
    time: {
        fontSize: 14,
        fontWeight: '200',
        position: 'absolute',
        left: wp('85%')
    },
    unreadname: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    unreadmsg: {
        fontSize: 14,
        fontWeight: '700'
    },
    unreadtime: {
        fontSize: 14,
        fontWeight: '400',
        position: 'absolute',
        left: wp('85%'),
        top: hp('5%')
    },
});