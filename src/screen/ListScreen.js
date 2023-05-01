import * as React from 'react';
import { Text, View, Button,StyleSheet,Image } from 'react-native';
import { Btn } from '../components/Btn';
import { collection, addDoc, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';


export default function ListScreen({ route, navigation }) {

  const [name, setName] = React.useState("");

  const { title } = route.params;


  React.useEffect(() => {
    const fetchProfile = async () => {
      const q = query(
        collection(db, "userProfile"),
        where("email", "==", auth.currentUser?.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        setName(doc.data().name);
      }
    };


    fetchProfile();

  }, [auth.currentUser?.email]);



  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding:48 ,gap:16}}>
      <EventItem title={title}  navigation={navigation} />
    </View>
  );
}


const styles= StyleSheet.create({
  heading: {
    fontWeight:'bold',
    textAlign:'center',
    fontSize:24
  }
})