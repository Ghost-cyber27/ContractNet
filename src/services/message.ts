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

// getConversation returns raw backend rows (array)
export const getConversation = async (receiverId: number, jobId: number, token: string): Promise<BackendMessage[]> => {
  const res = await api.get(`/messages/${receiverId}/${jobId}`, {
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
export const sendMessage = async (data: SendPayload, token: string): Promise<IMessage | BackendMessage> => {
  const res = await api.post(`/messages/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Convert FastAPI response to GiftedChat IMessage shape
  return {
    _id: res.data.id,
    text: res.data.content,
    createdAt: new Date(res.data.sent_at),
    user: { _id: res.data.sender_id },
  };
};

// services/message.ts



