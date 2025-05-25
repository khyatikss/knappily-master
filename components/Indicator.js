import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {COLORS, SIZES} from '../constants';

const {width} = Dimensions.get('window');

const Indicator = ({scrollX}) => {
  const inputRange = [-width, 0, width];
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-10, 0, 10],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{translateX}],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 4,
    backgroundColor: COLORS.lightGray,
  },
  indicator: {
    position: 'absolute',
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});

export default Indicator;