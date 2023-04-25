import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Pressable,Switch } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged,setIsLogged]=useState(false)
  const [isShown, setIsShown] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigation.replace('MyApp');
        console.log('signed in');
        await AsyncStorage.setItem('isLogged', 'true');
      } else {
        setIsLogged(false);
        await AsyncStorage.removeItem('isLogged');
        await AsyncStorage.removeItem('userToken', token);
        await AsyncStorage.removeItem('userEmail', user.email);
        await AsyncStorage.removeItem('userPassword', password);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignIn = useCallback(async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged with:', user.email);

      const token = await user.getIdToken(auth, true);

      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userEmail', user.email);
      await AsyncStorage.setItem('userPassword', password);
      console.log(user.email);
    } catch (error) {
      alert(error.message);
    }
  }, [email, password]);

  return (
    <ScrollView keyboardDismissMode="interactive" contentContainerStyle={styles.container}>
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
          autoFocus
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a0a0a0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isShown? true:false}
          returnKeyType='go'
          autoCorrect={false}
        />
        <View style={{display:"flex",flexDirection:"row",gap:8}}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isShown ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#ffff"
            onValueChange={()=>setIsShown(!isShown)}
            value={isShown}
          />
          <Text style={{color: '#a0a0a0'}}>Show Password</Text>
        </View>

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>
            Don't have any account yet? <Text style={styles.linkHighlight}>Sign Up</Text>
          </Text>
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
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a0a0a0',
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor:'#fff9',
    borderRadius:8
  },
  button: {
    height: 50,
    minWidth:100,
    width: '100%',
    borderRadius: 8,
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
