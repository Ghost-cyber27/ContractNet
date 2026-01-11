import { NavigatorScreenParams } from '@react-navigation/native';

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  job_id: number;
  content: string;
  is_read: boolean;
  sent_at: string;
};

export interface Jobs {
    id: number;
    client_id: number;
    status: string;
    created_at: string;
    update_at: string | null;
};

export interface JobUpdate{
    title: string | null;
    description: string | null;
    category: string | null;
    budget: number | null;
    deadline: string | null;
    status: string | null;
};

export interface Notification{
    id: number;
    user_id: number;
    is_read: boolean;
    created_at: string;
};

export interface User{
    id: number;
    rating: number | 0;
    created_at: string;
};

export interface UserUpdate{
    full_name: string | null;
    bio: string | null;
    skills: string | null;
    profile_picture: string | null;
};

export interface Bid{
    id: number;
    job_id: number;
    freelancer_id: number;
    status: string;
    created_at: string;
};

export interface Payment{
    id: number;
    job_id: number;
    client_id: number;
    freelancer_id: number;
    payment_status: string;
    transaction_id: string | null;
    paid_at: string | null;
};

export interface Review{
    id: number;
    reviewer_id: number;
    reviewee_id: number;
    job_id: number;
    created_at: string;
};

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    User: NavigatorScreenParams<UserStackParamList>;
};

export type UserStackParamList = {
    UserTabs: undefined;
    About: undefined;
    Category: {name: string};
    ChangePassword: undefined;
    chatDetails: {id: number; receiver_id: number};
    JobDetails: {id: number, title: string, category: string, description: string, budget: number, deadline: Date, status: string};
    MyProfile: undefined;
    Privacy: undefined;
    Payment: {job_id: number};
    profileDetails: {id:number, full_name: string, category: string, profile_picture: string, rating: number, bio: string, skills: string[], verified: boolean, email: string };
    AddJob: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    OTP: {email: string};
}

export interface AppNavigatorProps {
  session: string | null;
}