import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../styles';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const OverviewCity = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <ImageBackground
        source={{
          uri:
            props.image
        }}
        imageStyle={{
          borderRadius: 12,
        }}
        style={styles.image}>
        <View style={styles.overlay}>
          <FontAwesome
            name="location-arrow"
            color={colors.light}
            style={styles.go}
          />
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.description}>{props.attractionsNo} attraction, {props.spotsNo} spots</Text>
        </View>
      </ImageBackground>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginStart: 10,
    borderRadius: 12,
  },
  image: {
    width: PHONE_WIDTH * 0.92,
    height: PHONE_HEIGHT * 0.25,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flex: 1,
    borderRadius: 12,
  },
  go: {
    color: colors.light,
    fontSize: 25,
    fontWeight: '900',
    alignSelf: 'flex-end',
    margin: 15,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginTop: 10,
    alignSelf: 'center',
    color: colors.light,
  },
  description: {
    fontSize: 15,
    marginHorizontal: 10,
    marginVertical: 2,
    alignSelf: 'center',
    color: colors.light,
  },
});

