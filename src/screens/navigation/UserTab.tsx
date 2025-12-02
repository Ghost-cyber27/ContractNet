import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyJobs from "../user/HomeScreen";
import Chat from "../user/Chat";
import Settings from "../user/Settings";
import Ionicons from '@expo/vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { UserStackParamList } from "../../types/types";


type OrderScreenNavigationProp = NavigationProp<UserStackParamList, 'UserTabs'>;

const Tab = createBottomTabNavigator();

export default function UserTabs(){
    const navigation = useNavigation<OrderScreenNavigationProp>();

   

    return(
        <Tab.Navigator screenOptions={{ headerShown: true }}>
            <Tab.Screen
                name="MyJobs"
                component={MyJobs}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="briefcase-outline" size={25} style={{ color: '#222' }}/>
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="chatbox-outline" size={24} style={{ color: '#222' }}/>
                    )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="settings-outline" size={24} style={{ color: '#222' }}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
