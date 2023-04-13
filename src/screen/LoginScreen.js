import React, { useState,useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth,  } from "../config/firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("MyApp")
      }
    })
    return unsubscribe
  }, [])

  const handleSignIn =()=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Logged with:', user.email);
    })
   .catch(error => alert(error.message))
  }
 
  return (
    <ScrollView keyboardDismissMode='interactive' contentContainerStyle={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>EventQuest</Text>
        <Text style={styles.subtitle}>Please login to continue.</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a0a0a0"
          value={email}
          onChangeText={setEmail}
          clearButtonMode={'unless-editing'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a0a0a0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable 
          style={styles.button}
          onPress={handleSignIn}
          >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable 
          onPress={() => navigation.navigate('Signup')}
          >
          <Text style={styles.link}>Don't have any account yet? <Text style={styles.linkHighlight}>Sign Up</Text></Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#654dff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius:64,
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding:'10%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#fff',
  },
  subtitle: {
    fontSize: 18,
    color:'#fff',
  },
  input: {
    height: 40,
    minWidth:100,
    width: '88%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor:'#fff9',
    borderRadius:100
  },
  button: {
    height: 50,
    minWidth:100,
    width: '88%',
    borderRadius: 100,
    backgroundColor: '#654dff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:80
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link:{
    marginTop:32,
  },
  linkHighlight:{
    color:'blue'
  }
});

export default LoginScreen;
