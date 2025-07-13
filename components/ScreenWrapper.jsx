import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { verticalScale } from '../utils/styling';
import { colors, spacingX } from '../constant/theme';

const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: spacingX._20,
        backgroundColor: colors.neutral600,
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
