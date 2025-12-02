import { useState, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreenParams, NavigationContainer } from '@react-navigation/native';
import { 
    UserStackParamList, 
    AppNavigatorProps, 
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

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const UserStack = createNativeStackNavigator<UserStackParamList>();


export const AuthStackNav: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="SignUp" component={SignUp} />
        <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

export const AppStackNav: React.FC = () => {
  return (
      <UserStack.Navigator screenOptions={{ headerShown: false }}>
        <UserStack.Screen name="UserTabs" component={UserTabs} />
        <UserStack.Screen name="chatDetails" component={ChatDetails} options={{headerShown: true}}/>
        <UserStack.Screen name="jobDetails" component={JobDetails} options={{headerShown: true}}/>
        <UserStack.Screen name="profileDetails" component={ProfileDetails} options={{headerShown: true}}/>
      </UserStack.Navigator>
  );
};

export  const RootNavigator: React.FC<AppNavigatorProps> = ({ session}) => {
    return(
        <NavigationContainer >
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {session ? (
            // User is authenticated, show the main app screens
            <RootStack.Screen name="User" component={AppStackNav} />
            ) : (
            <RootStack.Screen name="Auth" component={AuthStackNav} />
            )}
        </RootStack.Navigator>
        </NavigationContainer>
    );
}