import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FullWidthCard, OverviewCity } from '../../../components/cards';
import { PHONE_HEIGHT, colors } from '../../../components/styles';
import React, { useEffect, useState } from 'react';

import BackHeader from '../../../components/headers/BackHeader';
import { fetchCites } from '../../../apis/cites';
import { fetchToCategory } from '../../../apis/categories';

const ListCites = ({ route, navigation }) => {

  const [destinations, setDestination] = useState([]);
  const [loading, setLoading] = useState(true)



  const listDestinations = async () => {
    const response = await fetchCites('en')
    setDestination(response)
    setLoading(false)

  }
  useEffect(() => {
    listDestinations()
  }, [])



  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={Math.random()}
      onPress={() => navigation.navigate('cityDetails', { id: item.id })}>
      <OverviewCity
        name={item.city}
        attractionsNo={item.count_att}
        spotsNo={item.count_spot}
        image={item.poster}
      />
    </TouchableOpacity>

  )

  return (
    <View style={styles.container}>
      <BackHeader title="Cites" />

      {loading ? <ActivityIndicator color="#000" size="large" style={styles.laoder} /> :


        <FlatList
          // contentContainerStyle={styles.container}
          data={destinations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          initialNumToRender={12}
          numColumns={1}

        />


      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    alignItems: 'center'

  },
  laoder: {
    marginVertical: PHONE_HEIGHT * 0.3
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginHorizontal: '4%',
    marginBottom: '2%'
  }
});
export default ListCites;
