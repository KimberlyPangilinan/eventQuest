import React from 'react'
import { ScrollView,TextInput,Text, View ,Pressable,StyleSheet} from 'react-native'
import {Header} from '../components/Header'
import EventItem from '../components/EventItem';

const EventScreen = () => {
  return (
    <View style={styles.container}>
      <Header subtitle="My Saved Events" message="You must sign in first to view your saved events"  />
      <View style={styles.content}>
        
        <EventItem/>
        <EventItem/>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EventScreen;