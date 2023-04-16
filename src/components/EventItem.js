import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TextInput,TouchableOpacity, Text, View, Button,Pressable, StyleSheet,Image } from 'react-native';
import { Header } from '../components/Header';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { limit, onSnapshot, query, orderBy ,where, } from "firebase/firestore";
import { Btn } from './Btn';


  
const Item = ({title,id,description, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.innerContainer, {backgroundColor}]}>
     <Image source={{uri: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'}}
       style={styles.itemImage} />
       <View style={styles.itemInfo}>
       <View style={styles.itemHeader}>
       <Text style={styles.itemTitle}>{title}</Text>
       </View>
     
        <Text  style={styles.itemText}>{description}</Text>
       </View>
       
    </TouchableOpacity>)
  
const Seperator =()=> 
    <View style={{borderBottomWidth:0.5,borderColor:'#cbcad6'}}/>
  
const Header1 =({title})=> 
    <View  style={styles.MenuContainer}><Text style={styles.itemMenu}>{title}</Text></View>
  
const Footer1 =({handleNumber})=> 
    <View  style={styles.MenuContainer}>
      <Btn type="btnSecondary" name="View More" onPress={handleNumber}/>
    </View>

  
const EventItem = ({title,navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [limitValue, setLimitValue] = useState(6);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
      const q = query(collection(db, "events"), limit(limitValue), orderBy("datePosted", "asc"));
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
    }, [limitValue]);
    const handleNumber = () => {
      setLimitValue(prevLimitValue => prevLimitValue + 10); // increase limitValue by 10 on button press
    }

    const renderItem = ({item}) => {

      return(
          <Item title = {item.title} id={item.id} description={item.description}
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
       
        ListFooterComponent={<Footer1 handleNumber={handleNumber} />}
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
    itemInfo:{
      flexDirection:'column', gap:16,width:'100%',flexGrow:1,marginLeft:8
    },
    itemImage:{
      width: 100, height: 100,borderRadius:8
    },
    itemTitle:{
      flexGrow:1,
      color: 'black',
      fontSize: 18,
      textAlign:'left',
      fontWeight:'bold',
      maxWidth:'60%'
    },
  itemText: {
    color: 'black',
    fontSize: 16,
    maxWidth:'64%'
    
  },
  itemHeader:{
    flex:1
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
