import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Pressable,Switch,Image,Alert } from 'react-native';
import { signInWithEmailAndPassword,sendSignInLinkToEmail,sendPasswordResetEmail,signInWithRedirect  } from 'firebase/auth';
import { auth,provider } from '../config/firebase';
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox, Separator } from "react-native-btr";
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url:'https://eventsquest.page.link/naxz',
  handleCodeInApp: true,

  android: {
    packageName: 'com.kimberlypangilinan.eventsQuest',
    installApp: true,
    minimumVersion: '12'
  },
 
};

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

  
  const signUpWithGoogle = async () => {
    
    try {
      signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(token);
        console.log(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    } catch (error) {
      alert("Sorry! Google Sign in is currently unavailable, we are still fixing this issue");
    }
  };
  const emailSignIn = useCallback(async () => {
    if (!email || email.trim() === '') {
      // handle error: email is blank or undefined
      return;
    }
  
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      console.log(email)
      alert("email sent: ",email)
      AsyncStorage.setItem('emailForSignIn', email);
      
  
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      alert("Sorry! Email Sign in is currently unavailable, we are still fixing this issue")});
  }, [auth, email, actionCodeSettings]);
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

  const forgotPass = async()=>{
    await sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert(`Password reset sent to your ${email}`)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error)
    // ..
  });
  }

  return (
    <ScrollView keyboardDismissMode="interactive" contentContainerStyle={styles.container}>
      <View style={styles.welcome}>       
        <Pressable onPress={() => {
                navigation.navigate('MyApp');
              }} ><Text style={styles.title}>EventQuest</Text>
        </Pressable> 
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
          autoCorrect={false}
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
      <View style={{display:"flex",flexDirection:"row"}}>
          <View style={{display:"flex",flexDirection:"row",justifyItems:'space-around',width:200,alignItems:'center'}}>
            <CheckBox
              checked={isShown}
              color='#a0a0a0'
              onPress={()=>setIsShown(!isShown)}
            />
            <Text> Show Password</Text>  
          </View>
          <Pressable onPress={forgotPass}>
            <Text style={styles.link}>
            <Text style={styles.linkHighlight}>Forgot password?</Text>
            </Text>
          </Pressable>

      </View>
        

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>
            Don't have any account yet? <Text style={styles.linkHighlight}>Sign Up</Text>
          </Text>
        </Pressable>
        <Text style={styles.link1}>
           or continue with</Text>
          
        <Pressable style={styles.buttonGoogle} onPress={signUpWithGoogle}>
      
        <Image
        style={{width:32,height:32}}
        source={{
          uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png',
        }}
      />
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
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius:64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding:'10%',
   
   
  
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
  buttonGoogle: {
   
    borderRadius: 8,
   
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:16
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link:{
    marginVertical:16
  },
  link1:{
    marginVertical:16,
    color:'#a0a0a0',
  },
  linkHighlight:{
    color:'blue'
  }
});

export default LoginScreen;
