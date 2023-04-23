

import React, { useState,useEffect } from 'react';
import {Image, Pressable,Button, View,ScrollView, TextInput, Text,StyleSheet,Alert } from 'react-native';
import { auth,  } from "../config/firebase";
import {  signOut } from "firebase/auth";
import {Header} from '../components/Header'
import { Btn } from '../components/Btn';
import { collection, addDoc, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';
import { db} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const EditScreen = ({navigation}) => {

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    // Fetch the user's profile data from Firestore and update the state
    const fetchProfile = async () => {
      const q = query(collection(db, "userProfile"), where("email", "==", auth.currentUser?.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        setName(doc.data().name);
        setAddress(doc.data().address);
        setOccupation(doc.data().occupation);
      }
    };
    fetchProfile();
  }, []);

  const saveProfile = async () => {
    const q = query(collection(db, "userProfile"), where("email", "==", auth.currentUser?.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      const doc = querySnapshot.docs[0];
      await updateDoc(doc.ref, { name,address,occupation, updatedAt: new Date(), });
      console.log("Document updated with ID: ", doc.id);
      Alert.alert(
        "Successful",
        "Your profile is saved",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Personal Information")
          }
        ]
      );
    } else {
      const docRef = await addDoc(collection(db, "userProfile"), {
        name, address,occupation,
        email: auth.currentUser?.email,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("Profile successfully saved");
    }
  };

  return (
    <View style={styles.content}>
    <Text style={styles.heading}>{name?name: "Hello User"}</Text>
    <Image source={{uri: 'https://media.licdn.com/dms/image/D4D03AQHHc2GrG_M77Q/profile-displayphoto-shrink_200_200/0/1675865866867?e=1686182400&v=beta&t=UAJh0hkFa8DVTQIi_vWrxJFwRm2rtvk6PUnP2Sl-AvE'}}
       style={{width: 100, height: 100,borderRadius:100}} />
    <View>
      <Text>Full Name</Text>
      <TextInput style={styles.input}  value={name}
          onChangeText={setName} placeholder='Full name' readonly/>
    </View>
    <View>
      <Text>Occupation</Text>
      <TextInput style={styles.input}  value={occupation}
          onChangeText={setOccupation} placeholder='Occupation' readonly/>
    </View>
    <View>
      <Text>Address</Text>
      <TextInput style={styles.input}  value={address}
          onChangeText={setAddress} placeholder='Address' readonly/>
    </View>
    
    <Btn  name="Save"  onPress={saveProfile}/>
    
  </View>

  );
};

export default function ProfileScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigation.replace('Login');
      
      }
    });

    return unsubscribe;
  }, []);
  
  const [name, setName] = useState('');
  useEffect(() => {
    
    // Fetch the user's profile data from Firestore and update the state
    const fetchProfile = async () => {
      const q = query(collection(db, "userProfile"), where("email", "==", auth.currentUser?.email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        setName(doc.data().name);
    
      }
    };
    fetchProfile();
  }, [name,navigation]);
  const handleSignOut=async()=>{
    signOut(auth).then(() => {
      console.log('sign out');
      navigation.replace('MyApp');
      
    }).catch((error) => {
      // An error happened.
    });
    await AsyncStorage.removeItem('isLogged');
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('userPassword');
  }
  const [isLoggedIn,setIsLoggedIn] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(false);
      }else{
        setIsLoggedIn(true);
      }
    })

    return unsubscribe
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
          <Header title="Home Screen" subtitle="My Account" message="Join us by creating or signing in an account"/>
        
            <View style={styles.content}>
              
              <Image source={{uri: 'https://media.licdn.com/dms/image/D4D03AQHHc2GrG_M77Q/profile-displayphoto-shrink_200_200/0/1675865866867?e=1686182400&v=beta&t=UAJh0hkFa8DVTQIi_vWrxJFwRm2rtvk6PUnP2Sl-AvE'}}
       style={{width: 100, height: 100,borderRadius:100}} />
        <Text style={styles.heading}>{auth.currentUser?.email} </Text>
              <Text>UserID: {auth.currentUser?.uid}</Text>
              <Btn  name="Edit Profile" onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('Personal Information');
          }} />
              <Btn type="btnSecondary" name="Logout" onPress={handleSignOut}/>
            </View>
        
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    gap:16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:40
  },
  content1: {
    flex: 1,
    gap:16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:40
  },
  input: {
    height: 40,
    minWidth:100,
    width: 321,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor:'#fff9',
    borderRadius:8
  },
  heading: {
    fontWeight:'bold',
    textAlign:'left',
    fontSize:24
  }

});