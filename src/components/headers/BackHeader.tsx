import {PHONE_HEIGHT, PHONE_WIDTH, colors} from '../styles';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const BackHeader = props => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: PHONE_WIDTH,
      height: PHONE_HEIGHT * 0.09,
      backgroundColor: colors.mainBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    title: {
      fontSize: 14,
      fontWeight: 'bold',
      // marginStart: '30%',
      alignSelf: 'center',
      color: colors.mainText,
    },
    icon: {
      marginHorizontal: 10,
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name={
            i18n.language === 'ar'
              ? 'keyboard-arrow-right'
              : 'keyboard-arrow-left'
          }
          size={35}
          color={colors.mainColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{props.title} </Text>
      <View />
    </View>
  );
};

export default BackHeader;
