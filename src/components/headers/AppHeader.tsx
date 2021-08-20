import { Header, Icon } from 'react-native-elements';
import { colors, componetsStyles } from '../styles';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppHeader = (props) => {
  const navigation = useNavigation();
  return (
    <Header
      backgroundColor={colors.light}
      containerStyle={componetsStyles.appBar}
      leftComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="keyboard-arrow-left"
            size={35}
            color={colors.secondIcon}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      }
      centerComponent={props.middle}
      rightComponent={props.right}
    />
  );
};

export default AppHeader;
