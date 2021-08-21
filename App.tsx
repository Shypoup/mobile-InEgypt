import 'react-native-gesture-handler';

import * as React from 'react';

import Drawernavigation from './src/navigaitons/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native'
import { colors } from './src/components/styles';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.mainBackground} />

      <Drawernavigation />
    </NavigationContainer>
  );
};

export default App;

