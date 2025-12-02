import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api, fetchProfile } from "./client";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;

  signup: (
    full_name: string,
    email: string,
    password: string,
    profile_picture: string
  ) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      // SIGNUP
      signup: async (full_name, email, password, profile_picture) => {
        try {
          set({ loading: true });

          const res = await api.post(
            "/auth/signup",
            {
              full_name,
              email,
              password,
              role: "client",
              profile_picture,
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
