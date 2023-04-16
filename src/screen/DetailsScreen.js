import * as React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import { Btn } from '../components/Btn';

export default function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { description } = route.params;
  const { title } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , padding:16}}>
      <Text style={styles.heading}>{title}</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {JSON.stringify(description)}</Text>
     <Btn name="Register"/>
     
    </View>
  );
}

const styles= StyleSheet.create({
  heading: {
    fontWeight:'bold',
    textAlign:'left',
    fontSize:24
  }
})