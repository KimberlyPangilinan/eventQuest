import React,{useState,useEffect} from 'react'
import {Image, ScrollView, FlatList, TextInput, Text,Button, View, Pressable, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImgPicker = () => {
    const [image, setImage] = useState(null);
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
  return (
    <View>
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
        <Image source={{ uri: image }} style={{width: 200,height: 200,borderRadius:8,marginVertical:16}} />

        </TouchableOpacity>
         }
       
  

    </View>
  )}
export default ImgPicker
