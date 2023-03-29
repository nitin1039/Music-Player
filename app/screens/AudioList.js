import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AudioList = () => {
  return (
    <View style={Styles.container}>
      <Text>AudioList</Text>
    </View>
  )
}

export default AudioList

const Styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        
    }
})