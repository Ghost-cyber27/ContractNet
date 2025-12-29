import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RootNavigator } from './src/screens/navigation/RootNavigation';
import { AddJob } from './src/screens/user/ScreenComponent/addJob';
import * as Notifications from 'expo-notifications';
import { useAuthStore } from './src/services/AuthContext';

// await Notifications.requestPermissionsAsync();

// Notifications.setBadgeCountAsync(5); shows “5” on the app icon

// Notifications.setBadgeCountAsync(0);

export default function App() {
  
  return (
    <RootNavigator/>
  );
}

//<RootNavigator session="sfbsfbsfb"/>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
