
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen, { EditScreen } from './src/screen/ProfileScreen';
import * as React from 'react';
import {  ScrollView,SafeAreaView,RefreshControl,Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './src/screen/SignUpScreen';
import { auth  } from "./src/config/firebase";
import EventScreen from './src/screen/EventScreen';
import DetailsScreen from './src/screen/DetailsScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import CreateScreen from './src/screen/CreateScreen';
import EventItem from './src/components/EventItem';
import ListScreen from './src/screen/ListScreen';
import SearchScreen from './src/screen/SearchScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyApp() {
  return (
    <Tab.Navigator 
      screenOptions={{headerStyle: {backgroundColor: '#654dff'},
      headerTintColor: '#fff',}}>
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
        name="Create" 
        component={CreateScreen}
        options={{
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