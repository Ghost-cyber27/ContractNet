import { useState, useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
 } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { AllChats } from "../../services/message";
import { AntDesign } from "@expo/vector-icons";


type Chats = {
    id: number;
    sender_id: number;
    receiver_id: number;
    job_id: number;
    content: string;
    is_read: boolean;
    sent_at: string;
};

export default function Chat(){
    const [message, setMessage] = useState<Chats[]>([]);
    //add sender name
    useEffect(() => {
        const loadMessages = async() => {
            const msg = await AllChats('jkja');
            setMessage(msg);
        };

        loadMessages();
    }, []);

    return(
        <View style={styles.container}>
            {!message 
            ? (
                <View>
                    <Text>No Chat</Text>
                </View>
            ) 
            : (
                <FlatList
                    data={message}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatView}>
                            <View style={styles.img}>
                                <AntDesign name="message" size={30} color='black' />
                            </View>
                            <View>
                                <Text style={item.is_read ? styles.name : styles.unreadname}>{item.sender_id}</Text>
                                <Text style={item.is_read ? styles.msg : styles.unreadmsg}>{item.content}</Text>
                            </View>
                            <Text style={item.is_read ? styles.time : styles.unreadtime}>{item.sent_at}</Text>
                        </TouchableOpacity>
                    )}
                />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatView: {
        margin: 5,
        padding: 5,
        top: hp('20%'),
    },
    img: {
        width: wp('20%'),
        height: hp('7%'),
        borderRadius: 50,
        resizeMode: 'contain',
        backgroundColor: 'white',
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
        left: wp('75%')
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
        fontWeight: '600',
        position: 'absolute',
        left: wp('75%')
    },
});