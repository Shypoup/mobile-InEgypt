import {Header, Icon} from 'react-native-elements';
import {colors, componetsStyles} from '../styles';

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const AppHeader = props => {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <Header
      backgroundColor={colors.mainBackground}
      containerStyle={componetsStyles.appBar}
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name={
              i18n.language === 'ar'
                ? 'keyboard-arrow-right'
                : 'keyboard-arrow-left'
            }
            size={35}
            color={colors.secondIcon}
            style={{marginHorizontal: 10, marginTop: '5%'}}
          />
        </TouchableOpacity>
      }
      centerComponent={props.middle}
      rightComponent={props.right}
    />
  );
};

export default AppHeader;
