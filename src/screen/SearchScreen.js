import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { limit, onSnapshot, query, orderBy, where } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../config/firebase';

const Item = ({ title,onPress }) => {
  return (
    
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

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
    setFilteredEvents(events.filter(({ title }) => title.toLowerCase().includes(text.toLowerCase())));
  };

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      id={item.id}
      description={item.description}
      email={item.email}
      onPress={() => {
        navigation.navigate('Details', {
          itemId: item.id,
          description: item.description,
          title: item.title,
          email: item.email,
          when:item.when
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchText} onChangeText={handleSearch} />
      <FlatList data={filteredEvents} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  title: {
    fontSize: 18,
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
