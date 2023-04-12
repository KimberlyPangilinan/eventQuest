import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './src/Styles';
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './src/screen/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} ></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignUpScreen}  options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
     
    </NavigationContainer>

  );
}

