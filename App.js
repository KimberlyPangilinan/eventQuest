
import LoginScreen from './src/screen/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreen from './src/screen/SignUpScreen';
import { auth  } from "./src/config/firebase";
import EventScreen from './src/screen/EventScreen';


function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        onPress={() => navigation.navigate('EditPost')}
        title="Go to Edit Post"
      />
    </View>
  );
}

function EmptyScreen() {
  return <View />;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyApp() {
  return (
    <Tab.Navigator 
      screenOptions={{headerStyle: {backgroundColor: '#654dff'},
      headerTintColor: '#fff',}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
      <Tab.Screen name="More" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle: {
            backgroundColor: '#654dff',
          },
          headerTintColor: '#fff',}}>
        <Stack.Screen
          name="MyApp"
          component={MyApp}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} options={{headerStyle: {
            backgroundColor: '#654dff',
          },
          headerTintColor: '#fff',}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;