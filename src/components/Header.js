import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text,Image } from 'react-native';
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
      <View style={{display:'flex', flexDirection:'row',jusifyItems:'center',alignItems:'center',gap:8}}>
      <Image source={{ uri: auth.currentUser?.photoURL }} style={{width: 40,height: 40,borderRadius:100,marginVertical:16}} />
          <Text style={styles.text}>{auth.currentUser?.displayName}</Text>
      </View>
      :
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


