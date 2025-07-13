import { View, Text, Image } from 'react-native'
import React from 'react'
import ModalWrapper from './ModalWrapper'
import Typo from '../Typo'
import { colors, spacingY } from '../../constant/theme'

const AlertModal = ({open, name}) => {
  return (
    <ModalWrapper open={open}>
      <View>
          <Typo size={25} color={colors.neutral700} style={{textAlign: "center"}}>Congragulations</Typo>
          <Typo size={20} color={colors.neutral700} style={{textAlign: "center", marginTop: spacingY._15}}>You have completed timer {name}</Typo>
          {/* <Image source={AllImages.homer} resizeMode='cover'  /> */}
      </View>
    </ModalWrapper>
  )
}

export default AlertModal