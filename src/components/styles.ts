import { Dimensions, StyleSheet } from 'react-native';

export const PHONE_WIDTH = Dimensions.get('window').width;
export const PHONE_HEIGHT = Dimensions.get('window').height;

export const colors = {
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
  mainText: '#000',
  secondText: '#788087',
  linkText: '#3CB7E6',

  //background
  mainBackground: '#fff',
  secondBackground: '#eceded',

  //icons
  mainIcon: '#000',
  secondIcon: '#3CB7E6',
};

export const darkColors = {
  
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
  mainText: '#000',
  secondText: '#788087',
  linkText: '#3CB7E6',

  //background
  mainBackground: '#000000',
  secondBackground: '#788087',

  //icons
  mainIcon: '#000',
  secondIcon: '#3CB7E6',
  
};


export const componetsStyles = StyleSheet.create({
  appBar: {
    justifyContent: 'space-between',
    height: PHONE_HEIGHT * 0.13,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row'

  },
  title: {
    // marginHorizontal: '2%',
    marginVertical: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  boldTitle: {
    marginHorizontal: 20,
    marginVertical: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bigTitle: {
    // marginHorizontal: 20,
    // marginVertical: 15,
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondTitle: {
    // marginHorizontal: 20,
    // marginVertical: 3,
    fontSize: 15,
    fontWeight: '900',
    color: colors.gray,
  },
  linkText: {
    color: colors.mainColor,
  },
  article: {
    marginHorizontal: 20,
    fontSize: 16,
    marginVertical: 5,
  },

});
