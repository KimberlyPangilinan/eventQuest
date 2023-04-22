import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, Text, View, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '../config/firebase';
import { auth } from "../config/firebase";
import { onSnapshot } from "firebase/firestore";
import { Btn } from './Btn';

const Item = ({ name, email }) => (
  <View style={styles.innerContainer}>
    <View style={styles.itemInfo}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitle}>{name}</Text>
      </View>
      <View>
        <Text style={styles.itemText}> {email}</Text>
      </View>
    </View>
  </View>
);

const Seperator = () => <View style={styles.seperator} />;

const Header1 = ({ title }) => (
  <View style={styles.menuContainer}>
    <Text style={styles.itemMenu}>{title}</Text>
  </View>
);

const RegList = ({ title, itemId }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!user);
    });

    const q = query(
      collection(db, "registration"),
      where("eventID", "==", itemId ? itemId : null)
    );

    const unsubscribeevents = onSnapshot(q, (querySnapshot) => {
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      setEvents(events);
    });

    return () => {
      unsubscribe();
      unsubscribeevents();
    };
  }, [itemId]);

  const renderItem = ({ item }) => (
    <Item name={item.name} email={item.email} />
  );

  return (
    <View style={styles.container}>
      <Header1 title={title} />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Seperator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 8,
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 320,
  },
  itemInfo: {
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    flexGrow: 1,
    marginLeft: 8,
  },
  itemTitle: {
    flexGrow: 1,
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    maxWidth: '60%',
  },
  itemText: {
    color: 'black',
    fontSize: 12,
    maxWidth: '64%',
  },
  itemHeader: {
    flex: 1,
  },
  itemMenu: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  menuContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
  },
  seperator: {
    borderBottomWidth: 0.5,
    borderColor: '#cbcad6',
  },
});

export default RegList;