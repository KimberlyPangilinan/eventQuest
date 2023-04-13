import React from 'react'
import { ScrollView,TextInput,Text, View ,Pressable,StyleSheet} from 'react-native'
import {Header} from '../components/Header'

const EventScreen = () => {
  return (
    <View style={styles.container}>
      <Header subtitle="Events Treasure Chest" message="You must sign in first to view your saved events"  />
      <View style={styles.content}>
        <Text>This is the content of the home screen.</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EventScreen;