import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Input from '../components/InputField';
import CustomButton from '../components/Button/CustomButton';
import Typo from '../components/Typo';
import BackButon from '../components/Button/BackButton';
import { verticalScale } from '../utils/styling';
import { colors, radius, spacingX, spacingY } from '../constant/theme';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { addItems } from '../store/redux.js/user';
import { nanoid } from '@reduxjs/toolkit';

const Create = ({navigation}) => {
  const dispatch = useDispatch();
  const title = useRef('');
  const duration = useRef('');
  const categories = useSelector(state => state.userDetails.category);
  const items = useSelector(state => state.userDetails.items) ?? [];
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    id: '',
    title: '',
  });
  const [showAlert, setShowAlert] = useState({
    id: '',
    title: '',
  });

  const alertOptions = [
    {
      id: 'true',
      title: "Yes"
    },
    {
      id: 'false',
      title: "No"
    },
]

  function handleSubmit() {
    console.log(parseInt(duration.current))
    if(!title.current) {
      Alert.alert("Enter a title")
      return;
    }
    else if(isNaN(parseInt(duration.current))) {
      Alert.alert("Enter a valid duration")
      return;
    }
    else if(!category.id) {
      Alert.prompt("Select a category")
      return;
    }
    const updatedItem = [
      ...items,
      {
        id: nanoid(),
        name: title.current,
        duration: parseInt(duration.current),
        remaining: parseInt(duration.current),
        status: 'paused',
        categoryId: category.id,
        showAlert: showAlert.id == 'true'
      },
    ];

    dispatch(addItems({items: updatedItem}));
    navigation.goBack();
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButon iconSize={28} />
        <View style={styles.form}>
          <Input
            onChangeText={val => (title.current = val)}
            placeholder="Title"
          />
          <Input
            onChangeText={val => (duration.current = val)}
            placeholder="Duration"
          />
          <View style={styles.inputContainer}>
            <Dropdown
              style={[styles.dropdownContainer]}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={categories}
              activeColor={colors.neutral700}
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder="Select a category"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              value={category.id}
              onChange={item => {
                setCategory({ ...item, title: item.value });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Dropdown
              style={[styles.dropdownContainer]}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelectedText}
              iconStyle={styles.dropdownIcon}
              data={alertOptions}
              activeColor={colors.neutral700}
              maxHeight={300}
              labelField="title"
              valueField="id"
              placeholder="Show a halfway alert"
              itemTextStyle={styles.dropdownItemText}
              itemContainerStyle={styles.dropdownItemContainer}
              containerStyle={styles.dropdownListContainer}
              value={showAlert.id}
              onChange={item => {
                setShowAlert({ ...item, title: item.value });
              }}
            />
          </View>

          <CustomButton loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={'700'} color={colors.black}>
              Save
            </Typo>
          </CustomButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacingY._30,
    marginTop: verticalScale(50),
  },
  inputContainer: {
    gap: spacingY._10,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: 'bold',
    color: colors.text,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: '500',
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: verticalScale(15),
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
});
