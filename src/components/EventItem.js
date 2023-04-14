import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TextInput, Text, View, Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { limit, onSnapshot, query, where, } from "firebase/firestore";


const Item = ({name,id}) => (
    <View style={styles.innerContainer}>
      <Text style={styles.itemText}>{name}</Text>
      <Text>{id}</Text>
    </View>
  )
  const Seperator =()=> <View style={{borderBottomWidth:0.5,borderColor:'#3c343d'}}/>
  const Header1 =({title})=> <View  style={styles.MenuContainer}><Text style={styles.itemMenu}>{title}</Text></View>
  const Footer1 =()=> <View  style={styles.MenuContainer}><Text style={styles.itemMenu}>View More</Text></View>

  
const EventItem = ({title}) => {
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [cities, setCities] = useState([]);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
      const q = query(collection(db, "cities"), limit(3));
      const unsubscribeCities = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
            cities.push({id: doc.id, ...doc.data()});
        });
    setCities(cities);
  });
  return () => {
    unsubscribeCities();
    unsubscribe();
  };
}, []);
const renderItem = ({item}) => <Item name = {item.name} id={item.id}
      onPress={() => {setSelectedId(item.id)
            navigation.navigate('Details', {
            itemId: item.id,
            otherParam: 'anything you want here',
          });
        
        }}
/>
  return (
    <View style={styles.container}>
    <Header1 title={title}/>
           <FlatList 
        data={cities} 
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Seperator}
       
        ListFooterComponent={Footer1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height:'80%',
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  itemMenu: {
    color: 'black',
    fontSize: 16,
    textAlign:'center'
  },
  MenuContainer: {
    
    paddingVertical: 20,
    justifyContent: 'center',
  },
  });
export default EventItem
