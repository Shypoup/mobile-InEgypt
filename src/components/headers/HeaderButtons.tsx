import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../styles';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const HeaderButtons = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="keyboard-arrow-left"
          size={35}
          color={colors.mainColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.middlecomponent}>
        <Text style={styles.title}> {props.middle}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT * 0.09,
    backgroundColor: colors.transparentWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  middlecomponent: {
    marginHorizontal: PHONE_WIDTH * 0.16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginHorizontal: 10,
  },
});
export default HeaderButtons;
