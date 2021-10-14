import {Image, StyleSheet, Text, View} from 'react-native';
import {PHONE_HEIGHT, PHONE_WIDTH, componetsStyles} from '../../styles';

import React from 'react';
import {useTheme} from '@react-navigation/native';

export const Linecard = props => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: PHONE_WIDTH * 0.8,
      height: PHONE_HEIGHT * 0.1,
      alignSelf: 'center',
      marginVertical: 5,
      paddingVertical: 5,
      alignItems: 'center',
    },
    image: {
      width: PHONE_WIDTH * 0.27,
      height: '100%',
      marginVertical: 5,
      borderRadius: 5,
    },
    name: {
      width: PHONE_WIDTH * 0.5,
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: '7%',
      color: colors.mainText,
    },
    category: {
      ...componetsStyles.secondTitle,
      marginHorizontal: '7%',
    },
  });
  return (
    <View style={styles.container}>
      <Image source={{uri: props.image}} style={styles.image} />
      <View>
        <Text style={styles.name} numberOfLines={2}>
          {props.name}
        </Text>
        <Text style={styles.category}>{props.category}</Text>
      </View>
    </View>
  );
};

export default Linecard;
