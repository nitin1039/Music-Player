import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Player = () => {
  return (
    <View style={Styles.container}>
      <Text>Player</Text>
    </View>
  )
}

export default Player

const Styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        
    }
})