import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const Header = ({title,name})=>  {
 
    return (
      <View className={styles.container}>
        <Text> {title} </Text>
        <Text> {name} </Text>
      </View>
    )
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#654dff',
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

