import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import { FullWidthCard } from '../../../components/cards';
import { colors } from '../../../components/styles';
import { useNavigation } from '@react-navigation/native';

const Destinations = (props) => {


  const [view, setView] = useState(props.view);
  const navigation = useNavigation();



  useEffect(() => {
    setView(props.view);
  }, [props.view]);


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
        category={item.category}
        temprature={item.temprature}
        view={view}
      />
    </TouchableOpacity>

  )

  return (
    <>


      {props.city === null ? null :
        <Text style={styles.cityName}>In {props.city}</Text>
      }

      <FlatList
        contentContainerStyle={styles.container}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={12}
        numColumns={view}
        key={view}
      />



    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    alignItems: 'center',
    width: '100%'

  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: '5%'
  }

});
export default Destinations;
