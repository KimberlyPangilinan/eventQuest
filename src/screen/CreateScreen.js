import React, { useState, useEffect } from 'react';
import {Image, ScrollView, FlatList, TextInput, Text,Button, View, Pressable, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db,auth } from '../config/firebase';
import EventItem from '../components/EventItem';
import { Header } from '../components/Header';
import { Btn } from '../components/Btn';


const CreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  

  const addEvent = async () => {
    const docRef = await addDoc(collection(db, "events"), {
      title: title,
      description: description,
      type:type,
      when: when,
      where: where,
      datePosted: new Date(),
      email:auth.currentUser?.email,
      status:'pending'

    });
    console.log("Document written with ID: ", docRef.id);
    alert("Event submission successful! Pending admin approval for posting.")
  };

  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Event Information</Text>
        <Image source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC'}}
        style={{width: 320, height: 120,borderRadius:8,marginVertical:16}} />
        <View>
        <Text>Event/Webinar Title</Text>
        <TextInput style={styles.input}  value={title}
            onChangeText={setTitle} placeholder='' />
        </View>
        <View>
        <Text>Description</Text>
        <TextInput style={styles.input}  value={description}
            onChangeText={setDescription} placeholder='' />
        </View>
        <View>
        <Text>Type</Text>
        <TextInput style={styles.input}  value={type}
            onChangeText={setType} placeholder='' />
        </View>
        <View>
        <Text>When</Text>
        <TextInput style={styles.input}  value={when}
            onChangeText={setWhen} placeholder='' />
        </View>
        <View>
        <Text>Where</Text>
        <TextInput style={styles.input}  value={where}
            onChangeText={setWhere} placeholder='' />
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
    flex: 1,
    gap:8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:40,
    height:'60%'
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