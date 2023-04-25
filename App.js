
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen, { EditScreen } from './src/screen/ProfileScreen';
import React,{useState,useEffect} from 'react';
import {  ScrollView,SafeAreaView,RefreshControl,Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './src/screen/SignUpScreen';

import EventScreen from './src/screen/EventScreen';
import DetailsScreen from './src/screen/DetailsScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import CreateScreen from './src/screen/CreateScreen';
import EventItem from './src/components/EventItem';
import ListScreen from './src/screen/ListScreen';
import SearchScreen from './src/screen/SearchScreen';
import Picker from './src/screen/Picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth,  } from "./src/config/firebase";
import { signInWithCustomToken,signInWithEmailAndPassword } from 'firebase/auth';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyApp() {
  return (
    <Tab.Navigator 
     
      screenOptions={{headerStyle: {backgroundColor: '#654dff'},
      headerTintColor: '#fff'}
      }>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={16} />
            ),
          }}
        />
      
      <Tab.Screen
        name="Search" 
        component={SearchScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" color={color} size={16} />
            ),
      }} />
      <Tab.Screen 
        name="Events" 
        component={EventScreen} 
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" color={color} size={16} />
            ),
          }}
        />
      <Tab.Screen 
        name="Create an event" 
        component={CreateScreen}
        options={{tabBarLabel: 'Create',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create" color={color} size={16} />
            ),
          }} />
      <Tab.Screen
        name="Account" 
        component={ProfileScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={16} />
            ),
          }} />
       

    </Tab.Navigator>
  );
}

function App() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [userEmail, setUserEmail] = useState('');
 
  useEffect(() => {
    const checkUserAuth = async () => {
   
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userPassword = await AsyncStorage.getItem('userPassword');
      const userToken = await AsyncStorage.getItem('userToken');
      const isLogged = await AsyncStorage.getItem('isLogged');
      if ( isLogged) {
        console.log("succcessfuly get")
        console.log(userEmail);
        console.log(userPassword);
        signInWithEmail(userToken,userEmail,userPassword);
      } else {
        console.log(auth + 'dauthhh');
      }
    };

    checkUserAuth();

  }, []);
  

  //this block of code is used to fetch the log in credentials of the user to stay logged in even when the app is closed
  const signInWithEmail = async (userToken,userEmail,userPassword) => {
    try {
      //const userCredential = await signInWithCustomToken( auth, userToken);
     const userCredential = await signInWithEmailAndPassword(auth, userEmail , userPassword);
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  return (
    <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#654dff' }, headerTintColor: '#fff' }}>
            <Stack.Screen name="MyApp" component={MyApp} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Upcoming Events" component={ListScreen} initialParams={{ title: "Upcoming Events" }} />
            <Stack.Screen name="Events Registered" component={ListScreen} initialParams={{ title: "Events Registered" }} />
            <Stack.Screen name="Events Created" component={ListScreen} initialParams={{ title: "Events Created" }} />
            <Stack.Screen name="Personal Information" component={EditScreen} />
            <Stack.Screen name="Search Screen " component={SearchScreen} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerStyle: { backgroundColor: '#654dff' }, headerTintColor: '#fff' }} />
          </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;