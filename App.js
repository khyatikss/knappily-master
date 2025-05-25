import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './Navigation/StackNavigator';
import {StatusBar} from 'react-native';
import {COLORS} from './constants';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;