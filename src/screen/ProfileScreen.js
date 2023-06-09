

import React, { useState,useEffect } from 'react';
import {Image, Pressable,Button, TouchableOpacity,View,ScrollView, TextInput, Text,StyleSheet,Alert,ActivityIndicator } from 'react-native';
import { auth,  } from "../config/firebase";
import {  signOut,sendEmailVerification,updatePassword,getASecureRandomPassword  } from "firebase/auth";
import {Header} from '../components/Header'
import { Btn } from '../components/Btn';
import { collection, deleteDoc, addDoc, getDocs, where, query, doc, updateDoc, } from 'firebase/firestore';
import { db} from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, updateProfile } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const AccountScreen=({navigation})=>{
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState('');
  const [newPass, setNewPass] = useState('');
  useEffect(() => {
    // Fetch the user's profile data from Firestore and update the state
    const fetchProfile = async () => {
      const user = auth.currentUser;

     
      if (user !== "") {
        setEmail(user.email)
        setVerified(user.emailVerified)
    
        console.log(user)
      }
    };
    fetchProfile();
  
  }, []);
  const sendVerification = async()=>{
    sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
    alert(`Email verification sent to ${email}. Please follow the instructions given`)
  });
  }
  const changePassword = async()=>{
   
const user = auth.currentUser;
//const newPassword = getASecureRandomPassword();

updatePassword(user, newPass).then(() => {
  // Update successful.
  alert("Password updated successfully")
}).catch((error) => {
  // An error ocurred
  // ...
  alert("Error updating your password ", error)
});

  }
  return(
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.accountContent}>
    <View style={{display:'flex',gap:8}}>        
        <Text style={styles.heading}>PASSWORD CHANGE</Text>
        <Text>Email</Text>
        <TextInput style={[styles.input, verified && styles.verifiedInput]}  value={email}
              placeholder='Email'  editable = {false}/>
              <Text>New Password</Text>
        <TextInput style={styles.input}  onChangeText={setNewPass}
              placeholder='Enter new password'  editable = {true}  secureTextEntry/>
        <Btn type="btnSecondary" name="Change Password"  onPress={changePassword}/>
        </View>
    <View style={{display:'flex',gap:8}}> 
        <Text style={styles.heading}>EMAIL VERIFICATION</Text>
        <Text>To help protect the security of your account, we require email verification. Simply click on the verification link we've sent to your email address to confirm that you are the owner of the account.
           Once your email is verified, you will have access to all of the features in our app, including the ability to post and submit events. 
           
          </Text>
           <Text> You may want to re-login for the changes to take effect</Text>
        <Btn type="btnSecondary" name="Verify Email"  onPress={sendVerification}/>
    </View>

       
    </View>
    </ScrollView>
  )
}
export const EditScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState();
  const [image, setImage] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [creation,setCreation]=useState('')

  const [isLoading, setIsLoading] = useState(false);
  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      setIsLoading(true)
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        
        const uploadURL=await uploadImageAsync(result.assets[0].uri)
        setImage(uploadURL);
      setInterval(() => {
        setIsLoading(false)
      }, 2000);
      }else{
        setImage(null)
        setInterval(() => {
          setIsLoading(false)
        }, 2000);
      }
    };
    const uploadImageAsync = async (uri)=>{

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      
      try{
        const storageRef =ref(storage,`images/image-${Date.now()}`)
        const result = await uploadBytes(storageRef,blob)
        blob.close();
        return await getDownloadURL(storageRef);
      }catch(error){
        alert(`Error: ${error}`)
        console.log(error)
      }

  //const fileRef = ref(getStorage(), uuid.v4());
  //const result = await uploadBytes(fileRef, blob);
    }

  useEffect(() => {
    // Fetch the user's profile data from Firestore and update the state
    const fetchProfile = async () => {
      const user = auth.currentUser;

     
      if (user !== "") {
        setEmail(user.email)
        setVerified(user.emailVerified)
        setName(user.displayName);
        setPhone(user.phoneNumber);
        setImage(user.photoURL)
        setCreation(user.metadata.creationTime)
        console.log(user)
      }
    };
    fetchProfile();
    setImage(auth.currentUser?.photoURL);
    setName(auth.currentUser?.displayName);
  }, []);
  const saveProfile =async()=>{
    await updateProfile(auth.currentUser, {
    displayName: name, phoneNumber:phone,photoURL:image
  }).then(() => {
    const user = auth.currentUser;
    console.log(user)
   console.log(user.displayName)
   alert("Profile successfuly saved.")
   navigation.replace('MyApp');  // ...
  }).catch((error) => {
   alert(error)
  });}
  const saveProfile1 = async () => {
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
    <ScrollView contentContainerStyle={styles.content}>
    <Text style={styles.heading}>{name?name: "Hello User"}</Text>
    {!image?
        <View>
          {isLoading?
          <View style={{width: 320, backgroundColor:"#e9eef1",height: 120,borderRadius:8,marginVertical:16,display:'flex',alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator
              animating
              size={"large"}
              color={"gray"}
            />
          </View>
          
        : <TouchableOpacity  onPress={pickImage} style={{width: 320, backgroundColor:"#e9eef1",height: 120,borderRadius:8,marginVertical:16,display:'flex',alignItems:"center",justifyContent:"center"}}>
            <Text>Choose an image</Text>
          </TouchableOpacity>
        }</View>:
        <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: image }} style={{width: 200,height: 200,borderRadius:100,marginVertical:16,borderWidth:4,borderColor:'#654dff'}} />

        </TouchableOpacity>
         }
         <View>
   
   <Text>Email</Text>
   <TextInput style={[styles.input, verified && styles.verifiedInput]}  value={email}
       onChangeText={setName} placeholder='Email'  editable = {false}/>
 </View>
 
    <View>
   
      <Text>Date created</Text>
      <TextInput style={styles.input}  value={creation}
          onChangeText={setName} placeholder='Date Created'  editable = {false}/>
    </View>
    <View>
  
      <Text>Full Name</Text>
      <TextInput style={styles.input}  value={name}
          onChangeText={setName} placeholder='Full name' readonly/>
    </View>
    <View>
      <Text>Phone</Text>
      <TextInput style={styles.input}  value={phone}
          onChangeText={setPhone} placeholder='Phone number' readonly/>
    </View>
  
    <Btn  name="Save"  onPress={saveProfile}/>
  </ScrollView>

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
  const handleSignOut = async () => {

          try {
            await signOut(auth);
            console.log('Signed out successfully');
            navigation.replace('MyApp');
            
            await AsyncStorage.removeItem('isLogged');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userPassword');
          } catch (error) {
            console.log('Error signing out:', error.message);
          }
        
      
    
  };
  
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
  }, [auth.currentUser?.displayName])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View style={{display:'flex',justifyContent: 'center', alignItems: 'center',gap:8}}>
          <Image source={{uri: auth.currentUser?.photoURL}} style={{width: 140, height: 140,borderRadius:100,borderWidth:4,borderColor:'#654dff'}} />
          <Text style={styles.heading}>{auth.currentUser?.displayName} </Text>
          <Text>{auth.currentUser?.email}</Text>
          <Text></Text>
          <Btn  
            name="Profile" 
            onPress={() => {
              navigation.navigate('Personal Information');
            }} />
        </View>
        <View style={{flex:1,gap:16,marginTop:16}}>
          
          <Btn type="btnSecondary" name="Account Settings"  onPress={() => {
              navigation.navigate('Account Settings');
            }}  />
          <Btn type="btnSecondary"  onPress={() => {
              navigation.navigate('Terms and Condition');
            }} name="Terms and Condition" />

          <Btn type="btnSecondary" name="Logout" onPress={handleSignOut}/>
        </View>


 
            </View>
        
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    display:'flex',
    backgroundColor: '#fff',
    minHeight:"100%"
  },
  content: {
   display:'flex',
   flexDirection:'column',
    gap:10,
    justifyContent: 'center',
    alignItems: 'center',
    padding:32,
    
  },
  accountContent: {
    display:'flex',
    flexDirection:'column',
     gap:32,
     justifyContent: 'center',
     alignItems: 'center',
     padding:32,
     
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
    fontSize:20
  },
  verifiedInput:{
    borderColor:'green',
    backgroundColor:'#ebfbea'
  }

});