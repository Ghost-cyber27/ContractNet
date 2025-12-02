// ChatDetails.tsx
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
import { connectChatSocket } from "../../../services/ws";
import { getConversation, sendMessage } from "../../../services/message";

const { height } = Dimensions.get("window");

// Helper to ensure a backend message (any shape) becomes an IMessage
const formatMessage = (m: any): IMessage => ({
  _id: m.id ?? m._id ?? Math.random().toString(), // fallback id
  text: m.content ?? m.text ?? "",
  createdAt: m.sent_at ? new Date(m.sent_at) : m.createdAt ? new Date(m.createdAt) : new Date(),
  user: {
    _id: m.sender_id ?? m.user?._id ?? 0,
    ...(m.user?.name ? { name: m.user.name } : {}),
    ...(m.user?.avatar ? { avatar: m.user.avatar } : {}),
  },
});

export function ChatDetails() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  // NOTE: replace with real token or pass it as prop/context
  const token = "ljsndlnslkdbsb";

  const loadMessages = async () => {
    try {
      // getConversation returns backend rows; convert to GiftedChat format
      const backendMessages = await getConversation(2, 1, token);
      const formatted = backendMessages.map((m: any) => formatMessage(m));
      // GiftedChat expects most recent first, usually -> keep your existing order if correct
      setMessages(formatted.reverse());
    } catch (err) {
      console.warn("Failed to load messages:", err);
    }
  };

  useEffect(() => {
    loadMessages();
    // run once on mount
  }, []);

  useEffect(() => {
    // connectChatSocket will send raw backend message shape; format it before appending
    const ws = connectChatSocket(token, (rawMsg: any) => {
      try {
        // If this message belongs to the current job/receiver logic, check fields accordingly
        // Example check (adjust depending on server payload):
        if (rawMsg.job_id === 2) {
          const formatted = formatMessage(rawMsg);
          //setMessages(prev => GiftedChat.append(prev, formatted));
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
  }, [token]); // depends only on token (or props you pass)

  // strongly type newMessages param to IMessage[]
  const onSend = useCallback(async (newMessages: IMessage[]) => {
    if (!newMessages.length) return;

    const clientMsg = newMessages[0];

    try {
      // sendMessage returns a backend response which we convert in the service,
      // but to be safe we format it again here (id, createdAt, etc).
      const savedBackend = await sendMessage(
        {
          text: clientMsg.text,
          receiver_id: 2,
          job_id: 1,
        },
        token
      );

      // sendMessage already returns a formatted GiftedChat object in the service,
      // but normalize again to be robust:
      const formatted = formatMessage(savedBackend);
      //setMessages(prev => GiftedChat.append(prev, formatted));
    } catch (err) {
      console.warn("Failed to send message:", err);
      // Optionally you can still append the optimistic message:
      // setMessages(prev => GiftedChat.append(prev, clientMsg));
    }
  }, [token]);

  const renderInputToolBar = (props: React.JSX.IntrinsicAttributes & InputToolbarProps<IMessage>) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderRadius: 16,
        backgroundColor: "#f2f8fc",
        marginHorizontal: 8,
        marginTop: 5,
        borderTopWidth: 0,
        bottom: 20,
      }}
    />
  );

  const renderSend = (props: React.JSX.IntrinsicAttributes & SendProps<IMessage>) => (
    <Send {...props}>
      <View style={{ marginBottom: 11 }}>
        <AntDesign name="send" size={24} color="#0075FD" />
      </View>
    </Send>
  );

  const renderBubble = (props: React.JSX.IntrinsicAttributes & BubbleProps<IMessage>) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: "#f2f8fc" },
        right: { backgroundColor: "#0075FD" },
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Chat with AI</Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1, // current_user_id
        }}
        renderAvatar={null}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolBar}
        renderSend={renderSend}
      />

      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: {
    paddingTop: height * 0.07,
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
});
