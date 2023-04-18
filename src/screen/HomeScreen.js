import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TextInput, Text,Button, View, Pressable, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';
import { Header } from '../components/Header';


const Item = ({name,id}) => (
  <View style={styles.innerContainer}>
    <Text style={styles.itemText}>{name}</Text>
    <Text>{id}</Text>
  </View>
)

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

  return () => {
    unsubscribe();
  };
}, []);


  const renderItem = ({item}) => <Item name = {item.name} id={item.id}/>

  return (
    <View style={styles.container}>
      <Header type="xl" title="Home Screen" subtitle="Welcome to EventQuest!" />
      <View style={styles.content}>
        
          <View>
            <EventItem title="Recently Added Events"  navigation={navigation}/>
          </View> 
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

  },
});

export default HomeScreen;
