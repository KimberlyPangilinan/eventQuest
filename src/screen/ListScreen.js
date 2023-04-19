import * as React from 'react';
import { Text, View, Button,StyleSheet,Image } from 'react-native';
import { Btn } from '../components/Btn';
import { collection, addDoc, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';


export default function ListScreen({ route, navigation }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState("");
  const [name, setName] = React.useState("");
  const [isRegistered, setIsRegistered] = React.useState("Register");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const { itemId } = route.params;
  const { description } = route.params;
  const { title } = route.params;
  const { email } = route.params;
  const { when } = route.params;

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

    const checkRegistration = async () => {
      const q = query(
        collection(db, "registration"),
        where("email", "==", auth.currentUser?.email),
        where("eventID", "==", itemId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size >= 1) {
        setIsRegistered("Registered");
        setIsDisabled(true);
      } else {
        setIsRegistered("Register");
        setIsDisabled(false);
      }
    };

    fetchProfile();
    checkRegistration();
  }, [auth.currentUser?.email]);

  const registerEvent = async () => {
    const docRef = await addDoc(collection(db, "registration"), {
      eventID: itemId,
      eventTitle: title,
      name: name,
      email: auth.currentUser?.email,
      dateRegistered: new Date(),
    });

    console.log("Document written with ID: ", docRef.id);
    setIsRegistered("Registered");
    setIsDisabled(true);
    alert("You are now registered");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding:48 ,gap:16}}>
      <EventItem title={title}  navigation={navigation}/>
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