import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PHONE_HEIGHT, colors} from '../../../components/styles';
import React, {useEffect, useState} from 'react';

import BackHeader from '../../../components/headers/BackHeader';
import {FullWidthCard} from '../../../components/cards';
import {fetchToCategory} from '../../../apis/categories';
import {useTranslation} from 'react-i18next';

const ListToCategory = ({route, navigation}) => {
  const {i18n} = useTranslation();
  const {id, title} = route.params;
  const [destinations, setDestination] = useState([]);
  const [loading, setLoading] = useState(true);

  const listDestinations = async () => {
    const response = await fetchToCategory(id, i18n.language);
    setDestination(response);
    setLoading(false);
  };
  useEffect(() => {
    listDestinations();
  }, []);

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
        longitude={item.longitude}
        latitude={item.latitude}
        view={1}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackHeader />
      <Text style={styles.title}>{title}</Text>
      {loading ? (
        <ActivityIndicator
          color={colors.mainColor}
          size="small"
          style={styles.laoder}
        />
      ) : (
        <FlatList
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
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
export default ListToCategory;
