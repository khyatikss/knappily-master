import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '../constants';

const Card = ({
  item,
  index,
  currentIndex,
  swipe,
  isSwipe,
  swipedcard,
  ...rest
}) => {
  const navigation = useNavigation();
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const nextCardScale = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [
      {
        rotate: index === currentIndex ? rotate : '0deg',
      },
      {
        scale: index === currentIndex + 1 ? nextCardScale : 1,
      },
    ],
  };

  return (
    <Animated.View
      style={[
        styles.card,
        animatedCardStyle,
        {
          zIndex: data.length - index,
        },
      ]}
      {...rest}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('Detail', {
            detail: item.detail,
            title: item.title,
            Img: item.image,
          })
        }>
        <Image source={{uri: item.image}} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {index === currentIndex && (
        <>
          <Animated.View
            style={[
              styles.likeContainer,
              {opacity: likeOpacity, left: 40, top: 20},
            ]}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.likeContainer,
              {
                opacity: dislikeOpacity,
                right: 40,
                top: 20,
                backgroundColor: 'red',
              },
            ]}>
            <Text style={styles.likeText}>NOPE</Text>
          </Animated.View>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SIZES.width - 40,
    height: SIZES.height * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    top: 20,
    left: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  category: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  date: {
    color: COLORS.white,
    fontSize: 12,
  },
  likeContainer: {
    position: 'absolute',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'green',
    borderColor: 'white',
    transform: [{rotate: '-30deg'}],
  },
  likeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Card;