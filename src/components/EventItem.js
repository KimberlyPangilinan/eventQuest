import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Button,
  Pressable,
  StyleSheet,
  Image,ActivityIndicator
} from 'react-native';
import {
  collection,
  addDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Btn } from './Btn';

const Item = ({
  title,image,
  id,
  description,
  organization,
  email,
  onPress,
  backgroundColor,
  textColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.innerContainer, { backgroundColor }]}
  >
    <Image
      source={{
        uri:
          image? image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC'
      }}
      style={styles.itemImage}
    />
    <View style={styles.itemInfo}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View>
        <Text style={styles.itemText}>
          {organization} | {email}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const Seperator = () => (
  <View style={{ borderBottomWidth: 0.5, borderColor: '#cbcad6' }} />
);

const Header = ({ title }) => (
  <View style={styles.menuContainer}>
    <Text style={styles.itemMenu}>{title}</Text>
  </View>
);

const Footer = ({ handleNumber,isLoading }) => (
  <View style={styles.menuContainer}>
    <Btn
      type="btnSecondary" 
      name={isLoading?
            <ActivityIndicator animating size={"small"} color={"gray"} />
            :"View More"} 
      onPress={handleNumber} />
  </View>
);

const EventItem = ({ title, navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [limitValue, setLimitValue] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date();
  const startOfToday = new Date();

  startOfToday.setHours(0, 0, 0, 0);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });

    let q = null;
    switch (title) {
      case 'Upcoming Events':
        q = query(
          collection(db, 'registration'),
          where('email', '==', auth.currentUser ? auth.currentUser.email : null),
         where('when', '>=', startOfToday)
        );
        break;
      case 'Events Registered':
        q = query(
          collection(db, 'registration'),
          where('email', '==', auth.currentUser ? auth.currentUser.email : null)
        );
        break;
      case 'Events Created':
        q = query(
          collection(db, 'events'),
          where('email', '==', auth.currentUser ? auth.currentUser.email : null)
        );
        break;
      default:
        q = query(collection(db, 'events'), limit(limitValue), where('when', '>=', startOfToday));
        break;
    }

    const unsubscribeevents = onSnapshot(q, querySnapshot => {
      const events = [];
      querySnapshot.forEach(doc => {
        events.push({ id: doc.id, ...doc.data() });
      });
      setEvents(events);
    });

    return () => {
      unsubscribe();
      unsubscribeevents();
    };
  }, [limitValue]);
    
    const handleNumber = async() => {
      setIsLoading(true)
      setInterval(() => {
        setIsLoading(false)
        setLimitValue(prevLimitValue => prevLimitValue + 5); // increase limitValue by 10 on button press
       
      }, 2000);
     
    }

    const renderItem = ({item}) => {

      return(

      title == "Upcoming Events"
          ? <Item title = {item.eventTitle} id={item.id} image={item.image}
                onPress={() => {setSelectedId(item.id)
                navigation.navigate('Details', {
                itemId: item.id,
                page: "Upcoming Events"
                });}}
               
          />:
      title=="Events Registered"
      ? <Item title = {item.eventTitle} id={item.id} organization={item.organization} image={item.image}
                onPress={() => {setSelectedId(item.id)
                navigation.navigate('Details', {
                itemId: item.eventID,
                
                page: "Events Registered"
                });}}
               
          />:
      title=="Events Created"
      ? <Item title = {item.title} id={item.id} organization={item.organization}  image={item.image} email={item.email} when={item.when} where={item.where} category ={item.category}
                onPress={() => {setSelectedId(item.id)
                navigation.navigate('Details', {
                itemId: item.id,
                page: "Events Created"
                });}}
               
          />

          : <Item title = {item.title} id={item.id} image={item.image} organization={item.organization} description={item.description} email={item.email} when={item.when} where={item.where} category ={item.category}
          onPress={() => {setSelectedId(item.id)
          navigation.navigate('Details', {
          itemId: item.id,
          description:item.description,
          title:item.title,
          email:item.email,
          organization:item.organization,
          when:item.when,
          where:item.where,
          category:item.category,
          image:item.image
          });}}
         
    />

          )
      }
return (
    <View style={styles.container}>
    <Header title={title}/>
    <FlatList 
        data={events} 
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Seperator}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer handleNumber={handleNumber} isLoading={isLoading} />}
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
  menuContainer: {
    
    paddingVertical: 20,
    justifyContent: 'center',
  },
  });
export default EventItem
