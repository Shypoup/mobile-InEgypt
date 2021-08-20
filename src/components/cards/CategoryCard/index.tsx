import { Image, StyleSheet, Text, View } from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../styles';

import React from 'react';

export const CategoryCard = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.image }}
        style={styles.image}
      >

      </Image>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: PHONE_WIDTH * 0.28,
    height: PHONE_WIDTH * 0.28,
    marginHorizontal: 5,
    marginVertical: 7,
    justifyContent: 'flex-end',
    borderRadius: PHONE_WIDTH * 0.02,
    backgroundColor: colors.lightGray,
    alignItems: 'center'
  },
  image: {

    width: '80%',
    height: '60%',
    resizeMode: 'contain'
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: 'bold',
    borderRadius: 3,
  },
});

