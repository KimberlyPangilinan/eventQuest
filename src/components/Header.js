import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { auth,  } from "../config/firebase";


export const Header = ({subtitle,message}) => {

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
    <View style={styles.header}>
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


