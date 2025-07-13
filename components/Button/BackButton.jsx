import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CaretLeftIcon } from "phosphor-react-native";
import { verticalScale } from "../../utils/styling";
import { colors, radius } from "../../constant/theme";
import { useNavigation } from "@react-navigation/native";

const BackButon = ({ style, iconSize = 26 }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button, style]}
    >
      <CaretLeftIcon
        size={verticalScale(iconSize)}
        color={colors.white}
        weight="bold"
      />
    </TouchableOpacity>
  );
};

export default BackButon;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    alignSelf: 'flex-start',
    borderRadius: radius._12,
    borderCurve: "continuous",
    padding: 5
  },
});
