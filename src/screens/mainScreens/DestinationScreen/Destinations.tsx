import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {FullWidthCard} from '../../../components/cards';
import {colors} from '../../../components/styles';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const Destinations = props => {
  const {colors} = useTheme();
  const [view, setView] = useState(props.view);
  const navigation = useNavigation();

  const {t} = useTranslation();

  useEffect(() => {
    setView(props.view);
  }, [props.view]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('destinationDetails', {
          id: item.id,
        })
      }>
      <FullWidthCard
        key={item.id}
        name={item.name}
        image={item.poster}
        city={item.city}
        category={item.category}
        longitude={item.longitude}
        latitude={item.latitude}
        view={view}
      />
    </TouchableOpacity>
  );

  return (
    <>
      {props.city === null ? null : (
        <Text style={[styles.cityName, {color: colors.mainText}]}>
          {t('In')}
          {props.city}
        </Text>
      )}

      <FlatList
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.mainBackground},
        ]}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        initialNumToRender={12}
        numColumns={view}
        key={view}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: '5%',
  },
});
export default Destinations;
