import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, radius } from '../../constant/theme'
import { verticalScale } from '../../utils/styling';
import Loading from '../Loading';

const CustomButton = ({
    style,
    onPress,
    loading=false,
    children
}) => {
    if(loading) {
        return (
            <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
                {/* loading component */}
                <Loading />
            </View>
        )
    }
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius._6,
        height: verticalScale(40),
        justifyContent: 'center',
        alignItems: 'center'
    }
})