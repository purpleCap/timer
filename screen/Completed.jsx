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

const Completed = () => {
    const data = useSelector(state => state.userDetails.completedItems) ?? [];
    // const [data, setData] = useState([]);

    // useFocusEffect(useCallback(() => {
    //     AsyncStorage.getItem('completedItems').then(items => {
    //         setData(JSON.parse(items))
    //     });
    // }, []))

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
      }
})