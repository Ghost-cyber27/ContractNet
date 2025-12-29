import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { 
    UserStackParamList, 
    AuthStackParamList, 
    RootStackParamList 
} from "../../types/types";
import UserTabs from "./UserTab";
import { ChatDetails } from "../user/ScreenComponent/ChatDetails"; 
import { ProfileDetails } from "../user/ScreenComponent/profileDetails";
import { JobDetails } from "../user/ScreenComponent/jobDetails";
import Login from "../Auth/Login";
import SignUp from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";
import OTP from "../Auth/OTP";
import { AddJob } from "../user/ScreenComponent/addJob";
import { Category } from "../user/ScreenComponent/Category";
import { useAuthStore } from "../../services/AuthContext";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const UserStack = createNativeStackNavigator<UserStackParamList>();


export const AuthStackNav: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{
          headerShown: true,
          headerTitle: ''
          }} />
        <AuthStack.Screen name="OTP" component={OTP} options={{
          headerShown: true,
          headerTitle: ''
          }} />
    </AuthStack.Navigator>
  );
};

export const AppStackNav: React.FC = () => {
  return (
      <UserStack.Navigator screenOptions={{ headerShown: false }}>
        <UserStack.Screen name="UserTabs" component={UserTabs} />
        <UserStack.Screen name="chatDetails" component={ChatDetails} options={{headerShown: true}}/>
        <UserStack.Screen name="JobDetails" component={JobDetails} options={{
          headerShown: true,
          }}/>
        <UserStack.Screen name="profileDetails" component={ProfileDetails} options={{headerShown: true}}/>
        <UserStack.Screen name="AddJob" component={AddJob} options={{headerShown: true}}/>
        <UserStack.Screen name="Category" component={Category} options={{
          headerShown: true, 
          }}/>
      </UserStack.Navigator>
  );
};

export  const RootNavigator: React.FC = () => {
  const { token, refresh, logout } = useAuthStore();

  useEffect(() => {
    const res = async() => {
      if (token && await refresh(token)) {
        logout(); // removes token
      }
    };

    res();
  },[token]);

    return(
        <NavigationContainer >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {token 
          ? <RootStack.Screen name="User" component={AppStackNav} />
          : <RootStack.Screen name="Auth" component={AuthStackNav} />
          } 
        </RootStack.Navigator>
        </NavigationContainer>
    );
}