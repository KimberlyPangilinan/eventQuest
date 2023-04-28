import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, TouchableOpacity, Text, View, StyleSheet,Image } from 'react-native';
import { limit, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';

const Item = ({ title,onPress,organization,image }) => {
  return (
    
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image source={{uri: image? image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC'}}
       style={{width: 40, height: 40,borderRadius:8}} />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.title}>{organization}</Text>
      </View>
    </TouchableOpacity>
  );
};
const Seperator = () => (
  <View style={{ borderBottomWidth: 0.5, borderColor: '#cbcad6' }} />
);

const SearchBar = ({ value, onChangeText }) => (
  <TextInput
    style={styles.searchBar}
    placeholder="Search..."
    value={value}
    onChangeText={onChangeText}
  />
);

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("datePosted", "asc"));
    const unsubscribeevents = onSnapshot(q, (querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      setEvents(events);
      setFilteredEvents(events);
    });
    return () => {
      unsubscribeevents();
    };
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    setFilteredEvents(events.filter(({ title, organization,category,email }) =>
    title.toLowerCase().includes(text.toLowerCase()) ||
    organization.toLowerCase().includes(text.toLowerCase()) ||
    category.toLowerCase().includes(text.toLowerCase()) ||
    email.toLowerCase().includes(text.toLowerCase())
    
  ));
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      organization={item.organization}
      id={item.id}
      description={item.description}
      email={item.email}
      image={item.image}
      onPress={() => {
        navigation.navigate('Details', {
          itemId: item.id,
          description: item.description,
          title: item.title,
          email: item.email,
          when:item.when,
        
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onChangeText={handleSearch} />
      <FlatList data={filteredEvents} renderItem={renderItem} ItemSeparatorComponent={Seperator} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: '#fff',
  },
  item: {
    padding: 8,
    fontSize: 18,
    display:'flex',
    flex:'grow',
    flexDirection:"row",
    gap:8
  },
  title: {
    fontSize: 18,
    width:320
  },
  searchBar: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor:'#fff9',
    borderRadius:8
  },
  input: {
   
  },
});

export default SearchScreen;
