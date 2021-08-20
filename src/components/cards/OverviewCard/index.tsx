import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export const OverviewCard = (props) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      marginHorizontal: 10,
      width: props.wide ? PHONE_WIDTH * 0.9 : PHONE_WIDTH * 0.6,
    },
    image: {
      width: '100%',
      height: props.wide ? PHONE_HEIGHT * 0.25 : PHONE_HEIGHT * 0.2,
      borderRadius: 50,
      marginHorizontal: 2
    },
    temprature: {
      color: colors.light,
      fontSize: 20,
      fontWeight: '900',
      alignSelf: 'flex-end',
      margin: 8,
    },
    name: {
      fontSize: 15,
      fontWeight: 'bold',
      marginHorizontal: 8,
      marginVertical: 4,
    },
    cityContainer: {
      flexDirection: 'row',
      marginHorizontal: 8,
    },
    city: {
      color: colors.gray,
      marginHorizontal: 5,
    },
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: props.image,
        }}
        imageStyle={{ borderRadius: 10 }}
        style={styles.image}>
        <Text style={styles.temprature}>{props.temprature}° C</Text>
      </ImageBackground>
      <Text style={styles.name} numberOfLines={2}>{props.name}</Text>
      <View style={styles.cityContainer}>
        {props.wide ? null :
          <FontAwesome name="location-arrow" size={15} color={colors.gray} />
        }
        <Text style={styles.city}>{props.city}</Text>
      </View>
    </View>
  );




}