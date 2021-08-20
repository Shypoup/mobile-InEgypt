import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PHONE_HEIGHT, colors } from '../../../components/styles';
import React, { useEffect, useState } from 'react';

import BackHeader from '../../../components/headers/BackHeader';
import { FullWidthCard } from '../../../components/cards';
import { fetchToCategory } from '../../../apis/categories';

const ListToCategory = ({ route, navigation }) => {
  const { id, title } = route.params;
  const [destinations, setDestination] = useState([]);
  const [loading, setLoading] = useState(true)



  const listDestinations = async () => {
    const response = await fetchToCategory(id, 'en')
    setDestination(response)
    setLoading(false)

  }
  useEffect(() => {
    listDestinations()
  }, [])



  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() =>
        navigation.navigate('destinationDetails', {
          id: item.id,
        })
      }
    >
      <FullWidthCard
        key={item.id}
        name={item.name}
        image={item.poster}
        city={item.city}
        temprature={item.temprature}
        view={1}
      />
    </TouchableOpacity>

  )

  return (
    <View style={styles.container}>
      <BackHeader />
      <Text style={styles.title}>{title}</Text>
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
    flex: 1

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
export default ListToCategory;
