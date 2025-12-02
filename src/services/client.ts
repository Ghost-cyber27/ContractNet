// src/api/client.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.232.82:8000", // change to your FastAPI base URL
});

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