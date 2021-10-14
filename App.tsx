import 'react-native-gesture-handler';

import * as React from 'react';

import {Appearance, StatusBar} from 'react-native';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {colors, darkColors} from './src/components/styles';

import Drawernavigation from './src/navigaitons/DrawerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

const colorScheme = Appearance.getColorScheme();
export const ThemeContext = React.createContext();
const App = () => {
  const [theme, setTheme] = React.useState(
    colorScheme === 'dark' ? 'Dark' : 'Light',
  );

  const themeData = {theme, setTheme};
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeContext.Provider value={themeData}>
      <NavigationContainer theme={theme == 'Light' ? lightTheme : darkTheme}>
        <StatusBar
          barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}
          backgroundColor={theme == 'Light' ? '#FFFFFF' : '#161719'}
        />

        <Drawernavigation />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    mainColor: '#3CB7E6',
    secondColor: '#f3ebe3',
    gray: '#788087',
    light: '#FFFFFF',
    lightGray: '#eceded',
    mediumGray: '#D3D3D3',
    dark: '#000',
    error: 'red',
    transparentGray: 'rgba(120,120,120, 0.4)',
    transparentWhite: 'rgba(255,255,255,0.65)',
    //Text
    mainText: '#CDCDCD',
    secondText: '#788087',
    linkText: '#3CB7E6',

    //background
    mainBackground: '#161719',
    secondBackground: '#25272B',

    //icons
    mainIcon: '#FFFFFF',
    secondIcon: '#3CB7E6',
  },
};
const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    mainColor: '#2c87f0',
    secondColor: '#f3ebe3',
    gray: '#788087',
    light: '#FFFFFF',
    lightGray: '#eceded',
    mediumGray: '#D3D3D3',
    dark: '#000',
    error: 'red',
    transparentGray: 'rgba(120,120,120, 0.4)',
    transparentWhite: 'rgba(255,255,255,0.65)',
    //Text
    mainText: '#000',
    secondText: '#788087',
    linkText: '#2c87f0',

    //background
    mainBackground: '#FFFFFF',
    secondBackground: 'rgba(255,255,255,0.65)',

    //icons
    mainIcon: '#000',
    secondIcon: '#2c87f0',
  },
};
