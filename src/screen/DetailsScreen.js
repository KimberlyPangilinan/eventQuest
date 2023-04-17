import * as React from 'react';
import { Text, View, Button,StyleSheet } from 'react-native';
import { Btn } from '../components/Btn';
import { collection, addDoc, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { db,auth } from '../config/firebase';


export default function DetailsScreen({ route, navigation }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState("");
  const [name, setName] = React.useState("");
  const [isRegistered, setIsRegistered] = React.useState("Register");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const { itemId } = route.params;
  const { description } = route.params;
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
      <Text style={styles.heading}>{title}</Text>
      <Text>itemId: {itemId}</Text>
      <Text>otherParam: {JSON.stringify(description)}</Text>
      <Btn name={isRegistered} disabled={isDisabled} onPress={registerEvent} />
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