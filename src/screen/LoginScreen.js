import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView keyboardDismissMode='interactive' contentContainerStyle={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>Welcome back!</Text>
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
          onPress={() => navigation.navigate('Home')}
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

export default LoginScreen;
