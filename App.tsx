import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ChatDetails } from './src/screens/user/ScreenComponent/ChatDetails';
import { RootNavigator } from './src/screens/navigation/RootNavigation';
import { TestChat } from './src/screens/user/testChat';

export default function App() {
  return (
    <RootNavigator session=""/>
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
