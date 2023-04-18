import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TextInput,TouchableOpacity, Text, View, Button,Pressable, StyleSheet,Image } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { limit, onSnapshot, query, orderBy ,where, } from "firebase/firestore";
import { Btn } from './Btn';


  
const Item = ({title,id,description,organization,email, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.innerContainer, {backgroundColor}]}>
     <Image source={{uri: 'https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg'}}
       style={styles.itemImage} />
       <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
        <View>
          <Text  style={styles.itemText}>{organization} | {email}</Text>
        </View>
       
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
    const [events, setevents] = useState([]);
    const [selectedId, setSelectedId] = useState();
    const [limitValue, setLimitValue] = useState(3);
    const today = new Date();
    const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);
    useEffect(() => {

     
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
      const q = title==="Upcoming Events"
      
      ? query(
        collection(db, "registration"),
        where("email", "==",auth.currentUser ? auth.currentUser.email : null),
        where("dateRegistered", ">=", startOfToday),
       )
      :  title=="Events Registered"
        ?  query(
          collection(db, "registration"),
          where("email", "==",auth.currentUser ? auth.currentUser.email : null))
         
      : query(collection(db, "events"), limit(limitValue),
        where("when", ">=", startOfToday));
      const unsubscribeevents = onSnapshot(q, (querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
            events.push({id: doc.id, ...doc.data()});
        });
      setevents(events);
    });
    return () => {
      unsubscribe();
      unsubscribeevents();

    };
    }, [limitValue]);
    
    const handleNumber = () => {
      setLimitValue(prevLimitValue => prevLimitValue + 5); // increase limitValue by 10 on button press
    }

    const renderItem = ({item}) => {

      return(

      title == "Upcoming Events"
          ? <Item title = {item.eventTitle} id={item.id} organization={item.organization} description={item.description} email={item.email}
                onPress={() => {setSelectedId(item.id)
                navigation.navigate('Details', {
                itemId: item.id,
                title:item.eventTitle,
                email:item.email,
                organization:item.organization
                });}}
               
          />:
      title=="Events Registered"
      ? <Item title = {item.title} id={item.id} organization={item.organization} description={item.description} email={item.email}
                onPress={() => {setSelectedId(item.id)
                navigation.navigate('Details', {
                itemId: item.id,
                description:item.description,
                title:item.title,
                email:item.email,
                organization:item.organization
                });}}
               
          />
          : <Item title = {item.title} id={item.id} organization={item.organization} description={item.description} email={item.email}
          onPress={() => {setSelectedId(item.id)
          navigation.navigate('Details', {
          itemId: item.id,
          description:item.description,
          title:item.title,
          email:item.email,
          organization:item.organization
          });}}
         
    />

          )
      }
return (
    <View style={styles.container}>
    <Header1 title={title}/>
    <FlatList 
        data={events} 
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Seperator}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer1 handleNumber={handleNumber} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({

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
