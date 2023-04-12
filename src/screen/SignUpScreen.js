import React, { useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { View, ScrollView,Button, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,  } from "../config/firebase";



const SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  useEffect(() => {
   
  }, [])

  const handleSignUp =()=>{
    
    createUserWithEmailAndPassword( auth,email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
    })
    .catch(error => alert(error.message))
  }
 

  return (
    <ScrollView keyboardDismissMode='interactive' contentContainerStyle={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>Join Us in Quests Hunting</Text>
        <Text style={styles.subtitle}>Create an account for more exciting events</Text>
      </View>
      <View style={styles.form}>
      <Text>Email:</Text>
      <TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Enter your email"
      />
      <Text>Password:</Text>
      <TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      {error ? <Text>{error}</Text> : null}
          <Text style={styles.link}>Don't have any account yet? <Text style={styles.linkHighlight}>Sign Up</Text></Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
  },
  input: {
    height: 50,
    minWidth:300,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    height: 50,
    minWidth:300,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link:{
    margin:8,
  },
  linkHighlight:{
    color:'blue'
  }
});

export default SignUpScreen;
