import { StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { colors } from '../constant/theme'
import { verticalScale } from '../utils/styling'

const Typo = ({
    size,
    color = colors.text,
    fontWeight = '400',
    children,
    style,
    textProps = {},
}) => {
    const textStyle = {
        fontSize: size ? verticalScale(size) : verticalScale(18),
        color,
        fontWeight
    }
  return (
   <Text style={[textStyle, style]} {...textProps}>{children}</Text>
  )
}

export default Typo

const styles = StyleSheet.create({})