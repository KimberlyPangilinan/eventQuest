import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TextInput,TouchableOpacity, Text, View, Button,Pressable, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { limit, onSnapshot, query, orderBy ,where, } from "firebase/firestore";
import { Btn } from './Btn';


  
const Item = ({title,id, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.innerContainer, {backgroundColor}]}>
        <Text style={styles.itemText}>{title}</Text>
        <Text>{id}</Text>
    </TouchableOpacity>)
  
const Seperator =()=> 
    <View style={{borderBottomWidth:0.5,borderColor:'#cbcad6'}}/>
  
const Header1 =({title})=> 
    <View  style={styles.MenuContainer}><Text style={styles.itemMenu}>{title}</Text></View>
  
const Footer1 =()=> 
    <View  style={styles.MenuContainer}>
      <Btn type="btnSecondary" name="View More"/>
    </View>

  
const EventItem = ({title,navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedId, setSelectedId] = useState();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
      const q = query(collection(db, "events"), limit(3), orderBy("datePosted", "asc"));
      const q1 = query(collection(db, "events"), limit(3), orderBy("when", "asc"));
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


    const renderItem = ({item}) => {

      return(
          <Item title = {item.title} id={item.id}
                onPress={() => {setSelectedId(item.id)
                navigation.navigate('Details', {
                itemId: item.id,
                otherParam: 'anything you want here',
                });}}
               
          />)
      }
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
        height:'100%',
      flex: 1,
      backgroundColor: '#fff',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height:'60%',
      width:'100%'
    },
    innerContainer:{
      padding:8,
      width:'100%',
      maxWidth:320,
      flexDirection:'row',
      justifyContent:'space-between',
      minWidth:320
    },
    
  itemText: {
    color: 'black',
    fontSize: 16,
  },
  itemMenu: {
    color: 'black',
    fontSize: 16,
    textAlign:'center',
    fontWeight:'bold'
  },
  MenuContainer: {
    
    paddingVertical: 20,
    justifyContent: 'center',
  },
  });
export default EventItem
