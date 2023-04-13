

import React, { useState,useEffect } from 'react';
import { Pressable,Button, View, Text,StyleSheet } from 'react-native';
import { auth,  } from "../config/firebase";
import {  signOut } from "firebase/auth";
import {Header} from '../components/Header'

export default function ProfileScreen({ navigation }) {
  
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      console.log('sign out');
    }).catch((error) => {
      // An error happened.
    });
  }
  const [isLoggedIn,setIsLoggedIn] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(false);
      }else{
        setIsLoggedIn(true);
      }
    })

    return unsubscribe
  }, [])
  return (
    <View style={styles.container}>
          <Header title="Home Screen" subtitle="More" message="You are still not logged in"/>
          {isLoggedIn? 
            <View style={styles.content}>
              <Pressable style={styles.button}   onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
              <Pressable style={styles.button}   onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
            : 
            <View style={styles.content}>
              <Text>Profile Screen</Text>
              <Text>Email: {auth.currentUser?.email}</Text>
              <Pressable style={styles.button}  onPress={handleSignOut}>
                <Text style={styles.buttonText}>Logout</Text>
              </Pressable>
            </View>
        }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    gap:16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    minWidth:100,
    width: '60%',
    borderRadius: 100,
    backgroundColor: '#654dff',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
});