import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FullWidthCard, OverviewCity} from '../../../components/cards';
import {PHONE_HEIGHT, colors} from '../../../components/styles';
import React, {useEffect, useState} from 'react';

import AppHeader from '../../../components/headers/AppHeader';
import BackHeader from '../../../components/headers/BackHeader';
import {fetchCites} from '../../../apis/cites';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const ListCites = ({route, navigation}) => {
  const {colors} = useTheme();
  const {t, i18n} = useTranslation();
  const [destinations, setDestination] = useState([]);
  const [loading, setLoading] = useState(true);

  const listDestinations = async () => {
    const response = await fetchCites(i18n.language);
    setDestination(response);
    setLoading(false);
  };
  useEffect(() => {
    listDestinations();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={Math.random()}
      onPress={() =>
        navigation.navigate('cityDetails', {
          id: item.id,
        })
      }>
      <OverviewCity
        key={Math.random()}
        id={item.id}
        name={item.city}
        attractionsNo={item.count_att}
        spotsNo={item.count_spot}
        image={item.poster}
      />
    </TouchableOpacity>
  );
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
      flex: 1,
    },
    laoder: {
      marginVertical: PHONE_HEIGHT * 0.3,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: '4%',
      marginBottom: '2%',
    },
  });

  return (
    <View style={styles.container}>
      <AppHeader
        middle={<Text style={{color: colors.mainText}}>{t('Cities')}</Text>}
      />

      {loading ? (
        <ActivityIndicator color="#000" size="small" style={styles.laoder} />
      ) : (
        <FlatList
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            marginEnd: '2%',
          }}
          data={destinations}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          initialNumToRender={12}
          numColumns={1}
        />
      )}
    </View>
  );
};

export default ListCites;
