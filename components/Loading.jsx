import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constant/theme'

const Loading = ({
    size = "large",
    color = colors.primary
}) => {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})