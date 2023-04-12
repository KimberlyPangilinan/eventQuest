

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth,  } from "../config/firebase";
export default function ProfileScreen({ navigation }) {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile Screen</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="You must Login first"
      />
       <Text>Email: {auth.currentUser?.email}</Text>
    </View>
  );
}