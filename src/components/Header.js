import React from 'react'
import { Text, View } from 'react-native'

export const Header = ({title,name})=>  {
 
    return (
      <View>
        <Text> {title} </Text>
        <Text> {name} </Text>
      </View>
    )
  }

