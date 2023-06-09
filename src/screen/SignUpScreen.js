import React, { useState,useEffect } from 'react';
import { View, ScrollView,Button, Text, StyleSheet, TextInput, Pressable, Alert,Switch } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,  } from "../config/firebase";
import { CheckBox, Separator } from "react-native-btr";
const SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
  }, [])

  const handleSignUp =()=>{
    createUserWithEmailAndPassword( auth,email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
      Alert.alert(
        "Successful",
        "You will be automatically logged in",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MyApp")
          }
        ]
      );
    })
    .catch(error => alert(error.message))
  }
 
  return (
    <ScrollView keyboardDismissMode='interactive' contentContainerStyle={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.title}>EventQuest</Text>
        <Text style={styles.subtitle}>Create an account for more</Text>
      </View>
      <View style={styles.form}>
      <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#a0a0a0"
          value={email}
          onChangeText={text => setEmail(text)}
          clearButtonMode={'unless-editing'}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#a0a0a0"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={!isShown? true:false}
          returnKeyType='go'
          autoCorrect={false}
        />
          <View style={{display:"flex",flexDirection:"row",justifyItems:'flex-start',alignItems:'flex-start',width:300}}>
          <View style={{display:"flex",flexDirection:"row",justifyItems:'center',alignItems:'center'}}>
            <CheckBox
              checked={isShown}
              color='#a0a0a0'
              onPress={()=>setIsShown(!isShown)}
            />
            <Text> Show Password</Text>  
          </View>
      </View>
        <Pressable 
          style={styles.button}
          onPress={handleSignUp}
          >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable 
          onPress={() => navigation.navigate('Login')}
          >
          <Text style={styles.link}>Already have an account? <Text style={styles.linkHighlight}>Login</Text></Text>
        </Pressable>
        <Pressable 
          onPress={() => navigation.navigate('Terms and Condition')}
          >
          <Text style={styles.link}>By signing up you agree with our <Text style={{fontWeight:'bold'}}>Terms and Condition </Text></Text>
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
    marginBottom: 16,
    color:'#fff',
  },
  subtitle: {
    fontSize: 18,
    color:'#fff',
    marginBottom: 8,
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
    backgroundColor:'#fff',
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
    marginTop:40
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link:{
    margin:16,
  },
  linkHighlight:{
    color:'blue'
  }
});

export default SignUpScreen;
