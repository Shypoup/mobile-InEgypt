import {Image, StyleSheet, Text, View} from 'react-native';
import {PHONE_WIDTH, colors} from '../../styles';

import React from 'react';
import {useTheme} from '@react-navigation/native';

export const CategoryCard = props => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: PHONE_WIDTH * 0.28,
      height: PHONE_WIDTH * 0.28,
      marginHorizontal: 5,
      marginVertical: 7,
      justifyContent: 'flex-end',
      borderRadius: PHONE_WIDTH * 0.02,
      backgroundColor: colors.secondBackground,
      alignItems: 'center',
    },
    image: {
      width: '80%',
      height: '60%',
      resizeMode: 'contain',
    },
    text: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      fontWeight: 'bold',
      borderRadius: 3,
      color: colors.mainText,
      textAlign: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Image source={{uri: props.image}} style={styles.image}></Image>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};
