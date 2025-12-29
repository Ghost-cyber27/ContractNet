import { AntDesign } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Platform, KeyboardAvoidingView } from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  IMessage,
  InputToolbarProps,
  SendProps,
  BubbleProps,
} from "react-native-gifted-chat";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";

type chatting = {
    _id: string;
    createdAt: Date;
    text: string;
    user: {
        _id: number;
    }
};

export function TestChat(){
    const [messages, setMessages] = useState<IMessage[]>();
    const [content, setContent] = useState<IMessage[]>()

    const onSend = useCallback((message: IMessage[] = []) => {
        setMessages((prev) => GiftedChat.append(prev, message));
    }, []);

    useEffect(() => {
      console.log("Updated messages:", messages);
    }, [messages]);



    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.heading}>Chat with AI</Text>
            </View>
            <View style={styles.chatView}>
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={{
                        _id: 1, // current_user_id
                    }}
                />
            </View>
            <StatusBar style="auto" />
            {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#fff" 
    },
    header: {
      paddingTop: 650 * 0.07,
      flexDirection: "row",
      paddingHorizontal: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#DDDDDD",
      paddingVertical: 8,
      backgroundColor: "#f2f8fc",
    },
    heading: { 
      fontWeight: "500", 
      paddingLeft: 16, 
      fontSize: 20 
    },
    headerName: { 
      fontSize: 25, 
      fontWeight: "400" 
    },
    headerImg: { 
      width: wp("15%"), 
      height: hp("6%"), 
      borderRadius: 50, 
      resizeMode: "contain" 
    },
    msgView: { 
      bottom: 56, 
      flexDirection: "row", 
      gap: wp("2%"), 
      padding: 5 
    },
    textInput: { 
      borderWidth: 2, 
      width: wp("80%"), 
      height: hp("7%"), 
      borderRadius: 10, 
      borderColor: "#184d85", 
      padding: 5 
    },
    btn: { 
      width: wp("15%"), 
      height: hp("7%"), 
      borderRadius: 10, 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "#184d85" 
    },
    chatView: {
      marginBottom: 50,
      backgroundColor: 'white',
      width: wp('100%'),
      height: hp('90%'),
    },
});