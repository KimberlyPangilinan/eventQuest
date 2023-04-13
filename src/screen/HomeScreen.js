import React, { useState,useEffect } from 'react'
import { ScrollView,TextInput,Text, View ,Pressable,StyleSheet} from 'react-native'
import {Header} from '../components/Header'
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../config/firebase'
import { auth,  } from "../config/firebase";
const HomeScreen = () => {
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
  // Add a new document with a generated id.
  const addEvent =async()=>{
    const docRef = await addDoc(collection(db, "cities"), {
  name: "Tokyo",
  country: auth.currentUser?.email
});
console.log("Document written with ID: ", docRef.id);
  }


  return (
    <View style={styles.container}>
      <Header title="Home Screen" subtitle="Welcome to my app!" />
      <View style={styles.content}>
        <Text>This is the content of the home screen.</Text>
        <Text>Email: {auth.currentUser?.email}</Text>
        <Pressable onPress={addEvent}><Text>Add</Text></Pressable>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;