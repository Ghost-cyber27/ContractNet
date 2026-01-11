// ChatDetails.tsx
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput,
  TouchableOpacity,
  Keyboard,
  Animated, 
  FlatList
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connectChatSocket } from "../../../services/ws";
import { getConversation, sendMessage } from "../../../services/message";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, RouteProp, useRoute, NavigationProp, useFocusEffect } from '@react-navigation/native';
import { UserStackParamList } from "../../../types/types";
import { useAuthStore } from "../../../services/AuthContext";

type ChatScreenNavigationProp = RouteProp<UserStackParamList, 'chatDetails'>;

interface Message {
  id: number;
  sender_id: number;
  receiver_id?: number;
  content: string;
  created_at: string;
}


export function ChatDetails() {
  const keyboardOffset = useRef(new Animated.Value(0)).current;
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const route = useRoute<ChatScreenNavigationProp>();
  const { id, receiver_id } = route.params;
  const key = useAuthStore((s) => s.token);
  const myId = useAuthStore((s) => s.user.id);
  const token = `${key}`;
  const [msg, setMsg] = useState('');
  const flatListRef = useRef<FlatList>(null);
  

  const loadMessages = async () => {
    try {
      const res = await getConversation(receiver_id, id, token);

      if (!res) return;

      const mapped: Message[] = res.map((msg: any) => ({
        id: msg.id,
        sender_id: msg.sender_id,
        receiver_id: msg.receiver_id,
        content: msg.content,
        created_at: msg.created_at,
      }));

      setMessages(mapped);
    } catch (err) {
      console.warn("Failed to load messages:", err);
    }
  };


  useEffect(() => {
    loadMessages();
    // run once on mount
    const show = Keyboard.addListener(
        "keyboardDidShow",
        (e) => {
            Animated.timing(keyboardOffset, {
                toValue: e.endCoordinates.height,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    );

    const hide = Keyboard.addListener(
        "keyboardDidHide",
        () => {
            Animated.timing(keyboardOffset, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    );

    return () => {
        show.remove();
        hide.remove();
    }
  }, []);

  useEffect(() => {
    const ws = connectChatSocket(token, (rawMsg: any) => {
      try {
        if (rawMsg.job_id === id) {
          setMessages(prev => [
              ...prev,
              {
                id: rawMsg.id,
                sender_id: rawMsg.sender_id,
                receiver_id: rawMsg.receiver_id,
                content: rawMsg.content,
                created_at: rawMsg.created_at,
              }
            ]);
        }
      } catch (e) {
        console.warn("Error processing websocket message:", e);
      }
    });

    wsRef.current = ws;
    return () => {
      try {
        ws.close();
      } catch (e) {}
      wsRef.current = null;
    };
  }, [token]);

  const onSend = useCallback(async (newMessages: Message[] = []) => {
    if (!newMessages.length) return;

    const clientMsg = newMessages[0];

    try {
      const res = await sendMessage(
        {
          receiver_id,
          job_id: id,
          content: clientMsg.content
        },
        token
      );

      setMessages(prev => [...prev, {
        id: res.id,
        sender_id: myId,
        receiver_id: receiver_id,
        content: res.content,
        created_at: res.created_at,
      }]);

      setMsg("");

    } catch (error) {
      console.warn("Failed to send message:", error);
    }
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      {/*Header*/}
            <View style={styles.header}>
              <TouchableOpacity style={{top: hp('0.5%')}} onPress={() => console.log(token)}>
                <AntDesign name="arrow-left" size={24} color='black' />
              </TouchableOpacity>
              <Text style={styles.heading}>Chat with AI</Text>
            </View>
            {/*Content Body*/}
            <View style={styles.chatView}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                    ref={flatListRef}
                    onContentSizeChange={() =>
                        flatListRef.current?.scrollToEnd({ animated: true })
                    }
                    renderItem={({ item }) => (
                        <View style={{padding: 5}}>
                            <View
                            style={[
                                styles.msgBubble,
                                item.sender_id === myId
                                ? styles.myMessage
                                : styles.theirMessage
                            ]}
                            >
                                <Text style={styles.msgText}>{item.content}</Text>
                                <Text style={{color: 'white', fontSize: 12}}>{new Date(item.created_at).toLocaleTimeString()}</Text>
                            </View>
                            
                        </View>
                    )}
                />
            </View>
            {/*Text input*/}
            <Animated.View
                style={{
                    position: "absolute",
                    bottom: 20,
                    left: 0,
                    right: 0,
                    transform: [{translateY: Animated.multiply(keyboardOffset, -1)}],
                    backgroundColor: 'white',
                    padding: 10
                }}
            >
                <View style={styles.inputView}>
                    <TextInput
                            multiline
                            placeholder="Type a message"
                            onChangeText={(text) => setMsg(text)}
                            value={msg} 
                            style={styles.textInput}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    <TouchableOpacity style={styles.btn} //onPress={() => onSend()}
                    >
                      <AntDesign name="send" color="white" size={24} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    height: hp('10%'),
    flexDirection: 'row',
    padding: 10,
    bottom: hp('5%'),
    backgroundColor: 'white',
    elevation: 10,
    alignItems: 'center',
    paddingTop: hp('4%')
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
    padding: 5,
    right: wp('4%') 
  },
  btn: { 
    width: wp("15%"), 
    height: hp("7%"), 
    borderRadius: 10, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: "#184d85",
    right: wp('4%')  
  },
  chatView: {
    backgroundColor: 'white',
    width: wp('100%'),
    height: hp('90%'),
    bottom: hp('3.5%')
  },
  msgBubble: {
      padding: 10,
      marginVertical: 5,
      maxWidth: '75%',
      borderRadius: 10,
  },
  myMessage: {
      backgroundColor: '#184d85',
      alignSelf: 'flex-end',
  },
  theirMessage: {
      backgroundColor: '#333',
      alignSelf: 'flex-start',
  },
  msgText: {
      color: 'white',
      fontSize: 16,
  },
  inputView: {
      gap: wp('1%'),
      padding: 10,
      flexDirection: 'row',
      backgroundColor: 'white',
  },
  texting: {
      fontSize: 16,
      width: '100%',
  },
  btnText: {
      fontSize: 16,
      color: 'white',
      fontWeight: '500'
  },
});
