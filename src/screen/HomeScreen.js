import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TextInput, Text,Button, View, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import {  onSnapshot, query, where, } from "firebase/firestore";
import EventItem from '../components/EventItem';


const Item = ({name,id}) => (
  <View style={styles.innerContainer}>
    <Text style={styles.itemText}>{name}</Text>
    <Text>{id}</Text>
  </View>
)
const Seperator =()=> <View style={{borderBottomWidth:0.5,borderColor:'#3c343d'}}/>
const Header1 =()=> <View  style={styles.MenuContainer}><Text style={styles.itemMenu}>Menu</Text></View>


const HomeScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  

   
  //  const unsubscribeCities = onSnapshot(collection(db, "cities"), (querySnapshot) => {
  //    const cityData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 //     setCities(cityData);
 //   });
  
  return () => {
    unsubscribeCities();
    unsubscribe();
  };
}, []);

  // Add a new document with a generated id.
  const addEvent = async () => {
    const docRef = await addDoc(collection(db, "cities"), {
      name: "Tokyo",
      country: auth.currentUser?.email
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const renderItem = ({item}) => <Item name = {item.name} id={item.id}/>

  return (
    <View style={styles.container}>
      <Header title="Home Screen" subtitle="Welcome to my app!" />
      <View style={styles.content}>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          });
        }}
      />
      {isLoggedIn?
      <View>
      <Text>Email: {auth.currentUser?.email}</Text>
        <Pressable onPress={addEvent}><Text>Add</Text></Pressable>

        <EventItem title="Recent Events"/>
        <EventItem title="Upcoming Events"/>
      </View> :
      <View>
     
        <EventItem title="Recent Events"/>
  
      </View>

      }

       
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
