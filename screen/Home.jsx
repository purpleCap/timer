import { View, Text, StyleSheet, ScrollView, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'
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
import { ShareIcon } from 'phosphor-react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    return true;
  }
}

async function saveJsonToFile(jsonData, fileName = 'timerdata.json') {
    const jsonString = JSON.stringify(jsonData, null, 2);
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

    try {
      // Create the JSON file
      await RNFS.writeFile(path, jsonString, 'utf8');

      // Check and request storage permission for Android
      if (Platform.OS === 'android') {
        const shareOptions = {
          title: 'Timer info',
          failOnCancel: false,
          urls: [ `file://${path}` ],
        };

        try {
          const ShareResponse = await Share.open(shareOptions);
          console.log(JSON.stringify(ShareResponse));
        } catch (error) {
          console.log('Error : ', error);
        }
      }

    } catch (error) {
      console.error('Error creating or sharing JSON file:', error);
    }
}



const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.userDetails.items) ?? [];
  const completedItems = useSelector(state => state.userDetails.completedItems) ?? [];

  useFocusEffect(useCallback(() => {
    requestStoragePermission()
  }, []))

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

  function onPressDownload() {
    saveJsonToFile(items)
  }

  return (
    <ScreenWrapper>
      <View style={{marginTop: spacingY._50, marginBottom: spacingY._20, alignItems: "flex-end"}}>
        <TouchableOpacity onPress={onPressDownload}>
          <ShareIcon size={28} color={colors.neutral200} />
        </TouchableOpacity>
      </View>
        <ScrollView style={[styles.container, {maxHeight: verticalScale(620)}]}>
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
    // marginTop: spacingY._50,
  },
  btnContainer: {
    position: 'absolute', 
    bottom: spacingY._17, 
    width: "100%", 
    alignSelf: "center",
    gap: spacingY._17
  }
})