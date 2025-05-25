import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {COLORS, SIZES, icons, data} from '../constants';
import Card from '../components/Card';
import LinearGradient from 'react-native-linear-gradient';

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swipe = useRef(new Animated.ValueXY()).current;
  const swipedcard = useRef(new Animated.ValueXY()).current;
  const [isSwipe, setIsSwipe] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      if (dx > 120) {
        Animated.spring(swipe, {
          toValue: {x: SIZES.width + 100, y: dy},
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          swipe.setValue({x: 0, y: 0});
        });
      } else if (dx < -120) {
        Animated.spring(swipe, {
          toValue: {x: -SIZES.width - 100, y: dy},
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          swipe.setValue({x: 0, y: 0});
        });
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding / 2,
        }}>
        <TouchableOpacity>
          <Image
            source={icons.menu}
            style={{height: 25, width: 25, tintColor: COLORS.primary}}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.primary}}>
          knappily
        </Text>
        <TouchableOpacity>
          <Image
            source={icons.search}
            style={{height: 25, width: 25, tintColor: COLORS.primary}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.white]}
        style={{height: 80}}>
        {renderHeader()}
      </LinearGradient>

      <View style={{flex: 1}}>
        {data
          .map((item, index) => {
            if (index < currentIndex) {
              return null;
            } else if (index === currentIndex) {
              return (
                <Card
                  key={item.id}
                  item={item}
                  index={index}
                  currentIndex={currentIndex}
                  isSwipe={isSwipe}
                  swipedcard={swipedcard}
                  swipe={swipe}
                  {...panResponder.panHandlers}
                />
              );
            } else {
              return (
                <Card
                  key={item.id}
                  item={item}
                  index={index}
                  currentIndex={currentIndex}
                  isSwipe={isSwipe}
                  swipedcard={swipedcard}
                  swipe={swipe}
                />
              );
            }
          })
          .reverse()}
      </View>
    </View>
  );
};

export default Main;