import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api, fetchProfile } from "./client";
import {jwtDecode} from "jwt-decode";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;

  signup: (
    data: {
    full_name: string;
    email: string;
    password: string;
    role: string;
    profile_picture?: string;
}
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  refresh: (token: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

interface MyJwtPayload {
  exp: number;  // required
  iat?: number;
  sub?: string;
  [key: string]: any;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      // SIGNUP
      signup: async (data) => {
        try {
          set({ loading: true });

          const res = await api.post(
            "/auth/signup",
            {
              full_name: data.full_name,
              email: data.email,
              password: data.password,
              role: data.role,
              profile_picture: data.profile_picture
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // OPTIONAL: auto-login after signup
          // set({
          //   token: res.data.access_token,
          //   user: await fetchProfile(res.data.access_token),
          // });

          set({ loading: false });
        } catch (err) {
          console.log("Signup error:", err);
          set({ loading: false });
          throw err;
        }
      },

      // LOGIN
      login: async (email, password) => {
        try {
          set({ loading: true });
          const formBody = new URLSearchParams({
                username: email,
                password: password,
            }).toString();

          // FIX: Use correct JSON headers instead of urlencoded!
          const res = await api.post(
            "/auth/login",
            formBody,
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );

          const token = res.data.access_token;
          console.log('Token: ', token);

          // MUST await fetchProfile
          const user = await fetchProfile(token);
          console.log("User: ", user);

          set({
            user,
            token,
            loading: false,
          });
        } catch (err) {
          console.log("Login error:", err);
          set({ loading: false });
          throw err;
        }
      },

      refresh: async (token) => {
        try {
          const decoded = jwtDecode<MyJwtPayload>(token);
          const now = Math.floor(Date.now() / 1000);
          return decoded.exp < now;
        } catch (error) {
          return true;
        }
      },

      // LOGOUT
      logout: async () => {
        set({
          user: null,
          token: null,
          loading: false,
        });
      },
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage), // FIXED STORAGE
    }
  )
);
