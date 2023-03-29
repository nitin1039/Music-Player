import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const PlayList = () => {
  return (
    <View style={Styles.container}>
      <Text>PlayList</Text>
    </View>
  )
}

export default PlayList

const Styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        
    }
})