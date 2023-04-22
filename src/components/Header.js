import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { auth,  } from "../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Header = ({subtitle,message,type}) => {

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
    <View style={type==="xl"?styles.headerXl: styles.header}>
      <Text style={styles.title}>{subtitle}</Text>
      {!isLoggedIn? 
        <Text style={styles.text}>{auth.currentUser?.email}</Text>:
        <Text style={styles.text}>{message}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    gap:16,
    backgroundColor: '#654dff',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius:80
  },
  headerXl: {
    gap:16,
    backgroundColor: '#654dff',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius:80
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text:{
    color:'white'
  }
  
});


