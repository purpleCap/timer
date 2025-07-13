import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CategoryAccordion from '../components/CategoryAccordion'
import { colors, spacingX, spacingY } from '../constant/theme';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import CustomButton from '../components/Button/CustomButton'
import Typo from '../components/Typo'
import { scale, verticalScale } from '../utils/styling'
import { addCompletedItems, addItems } from '../store/redux.js/user'


const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.userDetails.items) ?? [];
  const completedItems = useSelector(state => state.userDetails.completedItems) ?? [];

  useFocusEffect(useCallback(() => {
    // console.log(items)
    if(items && items.length==0) {
      AsyncStorage.getItem('items').then(items => {
        // console.log("async", items)
        dispatch(addItems({items: JSON.parse(items)}));
      })
    } else {
      items && AsyncStorage.setItem('items', JSON.stringify(items)).then(_=>{})
    }
  }, [items]))

  useFocusEffect(useCallback(() => {
    console.log("completed", JSON.stringify(completedItems));
    if(!completedItems || completedItems.length==0) {
      AsyncStorage.getItem('completedItems').then(items => {
        console.log("async", items)
        dispatch(addCompletedItems({completedItems: JSON.parse(items)}));
      })
    } else {
        if(completedItems.length > 0)
          AsyncStorage.setItem('completedItems', JSON.stringify(completedItems)).then(_=>{
            console.log("persisted")
        })
      }
  }, [completedItems]))

  const [categoryItem, setCategoryItem] = useState({workout: [], study: [], workbreak: []});
  useFocusEffect(useCallback(() => {
    const workout = [];
    const study = [];
    const workbreak = [];

    items.forEach(item => {
      switch(item.categoryId) {
        case 1:
          workout.push(item);
          break;
        case 2:
          study.push(item);
          break;
        case 3:
          workbreak.push(item);
          break;
      }

      setCategoryItem({
        workout,
        study,
        workbreak
      })
    })
  }, [items]))
  return (
    <ScreenWrapper>
        <ScrollView style={[styles.container, {maxHeight: verticalScale(670)}]}>
          <CategoryAccordion categoryName="Workout" data={categoryItem.workout} />
          <CategoryAccordion categoryName="Study" data={categoryItem.study} />
          <CategoryAccordion categoryName="Break" data={categoryItem.workbreak} />
        </ScrollView>
        <View style={styles.btnContainer}>
          <CustomButton onPress={() => navigation.navigate("CompletedScreen")}><Typo style={{fontWeight: "600", letterSpacing: scale(1)}} color={colors.neutral600}>All Completed</Typo></CustomButton>
          <CustomButton onPress={() => navigation.navigate("CreateScreen")}><Typo style={{fontWeight: "600", letterSpacing: scale(1)}} color={colors.neutral600}>Create</Typo></CustomButton>
        </View>
    </ScreenWrapper>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: spacingY._50,
  },
  btnContainer: {
    position: 'absolute', 
    bottom: spacingY._17, 
    width: "100%", 
    alignSelf: "center",
    gap: spacingY._17
  }
})