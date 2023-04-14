import React from 'react';
import {View, Pressable, Text, StyleSheet } from 'react-native';

export const Btn = ({type,name,onPress}) => {
  return (
    <View> 
      <Pressable 
        style={type==="btnSecondary"? styles.btnSecondary: styles.button}
        onPress={onPress}
        >
        <Text style={type==="btnSecondary"? styles.buttonTextSecondary: styles.buttonText}>
          {name}
        </Text>
      </Pressable>
    </View>
   
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#654dff',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  btnSecondary:{
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#654dff',
    justifyContent: 'center',
    alignItems: 'center',
 

  },
  buttonText: {
    color: '#fff',
    minWidth:180,
    width:320,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign:'center'
  },
  buttonTextSecondary: {
    color: '#654dff',
    minWidth:180,
    width:320,
    fontSize: 18,
    fontWeight: 'normal',
    textAlign:'center'
  },
});


