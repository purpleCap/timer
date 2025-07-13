import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Typo from '../components/Typo';
import { colors, radius, spacingX, spacingY } from '../constant/theme';
import { verticalScale } from '../utils/styling';
import BackButon from '../components/Button/BackButton';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

const Completed = () => {
    const ogdata = useSelector(state => state.userDetails.completedItems) ?? [];
    const categories = useSelector(state => state.userDetails.category) ?? [];
    console.log("OGDATA", JSON.stringify(ogdata))
    const [selectedCategory, setSelectedCategory] = useState({id: 0, title: 'All'});
    const [data, setData] = useState([]);

    useFocusEffect(useCallback(() => {
      const filteredData = ogdata.filter(item => {
        if(selectedCategory.id == 0) return true;
        return item.categoryId == selectedCategory.id;
      });
      setData(filteredData)
    }, [ogdata, selectedCategory]))

    const formatter = new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Europe/London'
    });

    function Item({item, index}) {
        return (
            <Animated.View entering={FadeIn.delay(index*100)} style={styles.containerTemplate}>
                <Typo>{item.name}</Typo>
                <Typo size={15}>{formatter.format(new Date(item.completedAt))}</Typo>
            </Animated.View>
        )
    }
  return (
    <ScreenWrapper>
        <View style={styles.container}>
            <BackButon iconSize={28} />
            <Dropdown
              style={[styles.dropdownContainer]}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={[{id: 0, title: 'All'}, ...categories]}
              activeColor={colors.neutral700}
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder="Filter by category"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              value={selectedCategory.id}
              onChange={item => {
                setSelectedCategory({ ...item, title: item.value });
              }}
            />
            {data.length == 0 && <Typo size={25}>No Timer</Typo>}
            <FlatList data={data} keyExtractor={item => item.id} renderItem={({item, index}) => <Item item={item} index={index} />} />
        </View>
    </ScreenWrapper>
  )
}

export default Completed

const styles = StyleSheet.create({
      container: {
        flex: 1,
        gap: spacingY._30,
        marginTop: verticalScale(30),
      },
      containerTemplate: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: colors.neutral500,
        borderRadius: radius._6,
        paddingHorizontal: spacingX._7,
        paddingVertical: spacingY._5,
        marginBottom: verticalScale(10),
        elevation: 5
      },
      dropdownContainer: {
        height: verticalScale(54),
        borderWidth: 1,
        borderColor: colors.neutral300,
        paddingHorizontal: spacingX._15,
        borderRadius: radius._15,
        borderCurve: 'continuous',
      },
      dropdownItemText: {
        color: colors.white,
      },
      dropdownSelectedText: {
        color: colors.white,
        fontSize: verticalScale(14),
      },
      dropdownListContainer: {
        backgroundColor: colors.neutral700,
        borderRadius: radius._15,
        borderCurve: 'continuous',
        paddingVertical: spacingY._7,
        top: 5,
        borderColor: colors.neutral500,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 5,
      },
      dropdownItemContainer: {
        borderRadius: radius._15,
        marginHorizontal: spacingX._7,
      },
      dropdownPlaceholder: {
        color: colors.white,
      },
      dropdownIcon: {
        height: verticalScale(30),
        tintColor: colors.neutral300,
      },
})