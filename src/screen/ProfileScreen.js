

import React, { useState,useEffect } from 'react';
import { Pressable,Button, View,ScrollView, TextInput, Text,StyleSheet } from 'react-native';
import { auth,  } from "../config/firebase";
import {  signOut } from "firebase/auth";
import {Header} from '../components/Header'
import { Btn } from '../components/Btn';


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
    <ScrollView contentContainerStyle={styles.container}>
          <Header title="Home Screen" subtitle="More" message="You are stilld not logged in"/>
         
          {isLoggedIn? 
            <View style={styles.content1}>
              
              <Btn type="btnSecondary" name="Sign Up" onPress={() => navigation.navigate('Signup')}/>
              <Btn name="Log In" onPress={() => navigation.navigate('Login')}/>
             
            </View>
            : 
            <View style={styles.content}>
              <Text style={styles.heading}>Personal Information</Text>
              
              <View>
                <Text>First Name</Text>
                <TextInput style={styles.input} placeholder='Name'/>
              </View>
              <View>
                <Text>Last Name</Text>
                <TextInput style={styles.input} placeholder='Name'/>
              </View>
              <View>
                <Text>Middle Name</Text>
                <TextInput style={styles.input} placeholder='Name'/>
              </View>
              <View>
                <Text>Birthdate</Text>
                <TextInput style={styles.input} placeholder='Name'/>
              </View>

              <Text>Email: {auth.currentUser?.email}</Text>
              <Btn  name="Edit Profile" />
              <Btn type="btnSecondary" name="Logout" onPress={handleSignOut}/>
            </View>
        }
    </ScrollView>
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
    paddingVertical:40
  },
  content1: {
    flex: 1,
    gap:16,
    justifyContent: 'end',
    alignItems: 'center',
    paddingVertical:40
  },
  input: {
    height: 40,
    minWidth:100,
    width: 256,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor:'#fff9',
    borderRadius:100
  },
  heading: {
    fontWeight:'bold',
    textAlign:'left'
  }

});