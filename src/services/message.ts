import { api } from "./client";
import { IMessage } from "react-native-gifted-chat";

type SendPayload = {
  content: string;
  receiver_id: number;
  job_id: number;
};

type BackendMessage = {
  id: number;
  content: string;
  sent_at: string | number;
  sender_id: number;
  // other fields...
};
//API Error: {"detail": [{"input": "chats", "loc": [Array], "msg": "Input should be a valid integer, unable to parse string as an integer", "type": "int_parsing"}]}

// getConversation returns raw backend rows (array)
export const getConversation = async (receiverId: number, token: string) => {
  const res = await api.get(`/messages/chats/message/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Expect res.data to be an array of backend messages
  return res.data;
};

export const AllChats = async(token: string) => {
  const res = await api.get('/messages', 
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
  );

  return res.data;
};

// sendMessage posts to /messages/ and returns a GiftedChat-like message
export const sendMessage = async (data: SendPayload, token: string) => {
  const res = await api.post(`/messages/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

// services/message.ts



