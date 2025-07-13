import { Pressable, StyleSheet, Text, TouchableNativeFeedback, TouchableNativeFeedbackBase, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react';
import * as Icons from "phosphor-react-native";
import AccordionItem from './Template/AccordionItem';
import { useSharedValue } from 'react-native-reanimated';
import { colors, radius, spacingX, spacingY } from '../constant/theme';
import Typo from './Typo';
import { verticalScale } from '../utils/styling';
import CategoryContent from './CategoryContent';
import CustomButton from './Button/CustomButton';

const CategoryAccordion = ({data, categoryName}) => {
    const contentRefs = useRef([]);

    if (contentRefs.current.length !== data.length) {
      contentRefs.current = data.map((_, i) => contentRefs.current[i] || React.createRef());
    }

    
    const open = useSharedValue(false);
    const onPress = () => {
      open.value = !open.value;
    };

    function onPlayAll() {
      contentRefs.current.forEach(ref => ref.current?.play());
    }
    
    function onPauseAll() {
      contentRefs.current.forEach(ref => ref.current?.pause());
    }
    
    function onResetAll() {
      contentRefs.current.forEach(ref => ref.current?.reset());
    }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.categoryContainer}>
        <View style={{justifyContent: "space-between", flexDirection: 'row'}}>
            <Typo size={20}>{categoryName}</Typo>
            <Icons.CaretDownIcon size={verticalScale(30)}
        weight={"regular"} color={colors.text} />
        </View>
        <View style={{width: "100%", marginVertical: spacingY._20}}>
          <View style={{flexDirection: 'row', flex: 1, alignItems: "center", marginTop: spacingY._10}}>
            <View style={[styles.subsection, {marginRight: spacingX._7}]}>
                <CustomButton onPress={onPlayAll} style={{backgroundColor: colors.green}}>
                    <Icons.PlayIcon size={20} color={colors.neutral300} weight={"bold"} />
                </CustomButton>
            </View>
            <View style={[styles.subsection]}>
                <CustomButton onPress={onPauseAll} style={{backgroundColor: colors.rose}}>
                    <Icons.PauseIcon size={20} color={colors.neutral300} weight={"bold"} />
                </CustomButton>
            </View>
            <View style={[styles.subsection, {marginLeft: spacingX._7}]}>
                <CustomButton onPress={onResetAll} style={{backgroundColor: colors.neutral400}}>
                    <Icons.ClockClockwiseIcon size={20} color={colors.neutral300} weight={"bold"} />
                </CustomButton>
            </View>
          </View>
        </View>
       <AccordionItem open={open} viewKey={"workout"}>
          <ScrollView style={{width: "100%"}}>
          {data.map((item, index) => (
            <CategoryContent
              key={item.id}
              ref={contentRefs.current[index]}
              item={item}
            />
          ))}
          </ScrollView>
        </AccordionItem>
    </TouchableOpacity>
  )
}

export default CategoryAccordion

const styles = StyleSheet.create({
    categoryContainer: {
        backgroundColor: colors.neutral500,
        paddingVertical: spacingY._10,
        borderRadius: radius._10,
        paddingHorizontal: spacingX._10,
        marginBottom: spacingY._12
    },
    subsection: {
      flex: 1
    }
})