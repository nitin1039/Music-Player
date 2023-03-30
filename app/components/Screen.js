import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import color from '../misc/color'
import { StatusBar } from 'react-native'

const Screen = ({children}) => {
  return (
    <View style={styles.container}>{children}</View>
  )
}

export default Screen

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.APP_BG,
        paddingTop: StatusBar.currentHeight
    }
})