import React, { useState, useEffect } from 'react';
import {Image, ScrollView, FlatList, TextInput, Text,Button, View, Pressable, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';
import { Header } from '../components/Header';
import { Btn } from '../components/Btn';
import Picker from './Picker';
import * as ImagePicker from 'expo-image-picker';
import { getFormatedDate } from "react-native-modern-datepicker";
import { storage } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [organization, setOrganization] = useState('');
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const today = new Date();
  const startDate = getFormatedDate(today.setDate(today.getDate() + 1),"YYYY/MM/DD");
  const [selectedStartDate, setSelectedStartDate] = useState("2023/04/25 00:00");
  const [startedDate, setStartedDate] = useState("12/12/2023");
  const dateString = selectedStartDate;
  const dateParts = dateString.split("/");
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2].substr(0, 2), 10);
  const hour = parseInt(dateParts[2].substr(3, 2), 10);
  const minute = parseInt(dateParts[2].substr(6, 2), 10);
  const dateObj = new Date(year, month, day, hour, minute);

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }
  const addEvent = async () => {
    try{
       const docRef = await addDoc(collection(db, "events"), {
        title: title,
        description: description,
        organization:organization,
        category:category,
        when: dateObj,
        where: where,
        datePosted: new Date(),
        email:auth.currentUser?.email,
        status:'pending',
        image:image
      });
      alert("Event submission successful! Pending admin approval for posting.")
      setTitle("");
      setCategory("")
      setDescription("")
      setOrganization("")
    }
    catch (error) {
      alert("Registration failed, you need to login first");
      setTitle("");
      setCategory("")
      setDescription("")
      setOrganization("")
     
    }}
   
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
    
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Event Information</Text>
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
        <Image source={{ uri: image }} style={{width: 320,height: 320,borderRadius:8,marginVertical:16}} />

        </TouchableOpacity>
         }
       
        
        <View>
        <Text>Event/Webinar Title</Text>
        <TextInput style={styles.input}  value={title}
            onChangeText={setTitle} placeholder='Event Title' />
        </View>
        <View>
        <Text>Description</Text>
        <TextInput style={styles.input}  value={description}
            onChangeText={setDescription} placeholder='A short Descrription about your event' multiline={true} />
        </View>
        <View>
        <Text>Category</Text>
        <TextInput style={styles.input}  value={category}
            onChangeText={setCategory} placeholder='Ex: Cybersecurity' />
        </View>
        <View>
        <Text>Organization</Text>
        <TextInput style={styles.input}  value={organization}
            onChangeText={setOrganization} placeholder='Organization hosting the event' />
        </View>

  
        <View>
        <Text>When</Text>
         <Picker mimimumDate={startDate} selected={startedDate} 
         onSelectedChange={(date) => setSelectedStartDate(date)}
         onDateChanged={handleChangeStartDate}
          selectedStartDate={selectedStartDate}
         />
        </View>
       
        <View>
        <Text>Link/Address/Platform</Text>
        <TextInput style={styles.input}  value={where}
            onChangeText={setWhere} placeholder='Add the platform or the Address' />
            
        </View>
       
        <Btn  name="Post" onPress={addEvent} />
        
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
  
    gap:8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:40,
 
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
    fontSize:16
  }
});

export default CreateScreen;
