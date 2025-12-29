// src/api/client.ts
import axios from "axios";
import { useAuthStore } from "./AuthContext";

export const api = axios.create({
  baseURL: "http://192.168.252.82:8000", // change to your FastAPI base URL
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout(); // Token invalid or expired
    }
    return Promise.reject(err);
  }
);

export const fetchProfile = async(token: string) => {
    try {
        const res = await api.get('/auth/me',{
            headers: {Authorization: `Bearer ${token}`}
        });
        return res.data;

    } catch (err) {
        console.log("Login error:", err);
        throw err;
    }
}