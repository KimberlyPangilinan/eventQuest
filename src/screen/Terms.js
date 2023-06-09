import React from 'react'
import { View,Text,StyleSheet,ScrollView } from 'react-native'
import { Btn } from '../components/Btn'

const Terms = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle ={{padding:32,gap:24,display:'flex'}}>  
    <Text style={{fontSize:40,fontWeight:"bold"}}>Welcome to EventQuest!</Text>
    <Text>
These terms and conditions outline the rules and regulations for the use of our mobile application.
</Text>
<Text>By downloading or using our app, you accept these terms and conditions in full. If you disagree with these terms and conditions, you should not use our app.</Text>

    <Text style={styles.heading}>Use of the App</Text>  
   <Text> EventQuest allows you to search for and post events. By using our app, you agree to use it only for lawful purposes and in a manner consistent with these terms and conditions.</Text>

   <Text style={styles.heading}>User Account</Text>
    <Text>In order to use some features of our app, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</Text>

    <Text style={styles.heading}>Event Listings</Text>
    <Text>EventQuest allows users to post and search for events. By posting an event, you represent and warrant that you have the right to do so and that your event complies with all applicable laws and regulations.</Text>

    <Text style={styles.heading}>Limitations of Liability</Text>
    <Text>EventQuest is not responsible for the accuracy, reliability, or completeness of any event listing or user-generated content. We are also not responsible for any damages, direct or indirect, resulting from your use of our app.
</Text>
     <Text style={styles.heading}>Modifications to Terms and Conditions</Text>
    <Text>EventQuest may revise these terms and conditions at any time without notice. By using our app, you agree to be bound by the current version of these terms and conditions.</Text>

<Text>Thank you for using EventQuest!</Text>


    <Btn name="Continue" onPress={() => {
              navigation.navigate('MyApp');
            }} />
    </ScrollView>
  
  )
}

const styles = StyleSheet.create({
    
    heading: {
      fontWeight:'bold',
      textAlign:'left',
      fontSize:16,
      display:'flex',
      flexDirection:'row',
      width:'100%'
    },

  });
  
export default Terms
