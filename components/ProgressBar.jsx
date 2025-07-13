import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../constant/theme';

const ProgressBar = ({ progress }) => {
  const animatedWidth = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const barWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={[styles.progressBar, { width: barWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primaryLight,
  },
});

export default ProgressBar;