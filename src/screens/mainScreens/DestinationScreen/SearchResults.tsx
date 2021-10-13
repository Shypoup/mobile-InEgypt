import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PHONE_HEIGHT, PHONE_WIDTH, colors} from '../../../components/styles';
import React, {useState} from 'react';

import {Icon} from 'react-native-elements';
import {searchDestination} from '../../../apis/destinations';
import {useEffect} from 'react';
import {useTheme} from '@react-navigation/native';

const SearchResults = props => {
  const {colors} = useTheme();
  const [searchResult, setSearchResults] = useState([]);
  let isArabic = /^[\u0621-\u064A0-9 ]+$/.test(props.search);
  const listSearch = async () => {
    const response = await searchDestination(
      props.search,
      isArabic ? 'ar' : 'en',
    );
    setSearchResults(response);
  };

  useEffect(() => {
    listSearch();
  }, [props.search]);
  const renderSearchResult = ({item}) => {
    return (
      <TouchableOpacity style={styles.resultContainer}>
        {!isArabic ? (
          <>
            <View style={styles.nameSection}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.cityText}>{item.category}</Text>
            </View>
            <Text style={styles.cityText}>{item.city}</Text>
          </>
        ) : (
          <>
            <View style={styles.nameSection}>
              <Text style={styles.cityText}>{item.category}</Text>
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
            <Text style={styles.cityText}>{item.city}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.mainBackground,
    },
    resultContainer: {
      marginHorizontal: '4%',
      paddingVertical: '3%',
      borderBottomWidth: 0.5,
      borderBottomColor: colors.gray,
      paddingHorizontal: '4%',
    },
    nameSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '1%',
    },
    nameText: {
      fontSize: 13,
      fontWeight: 'bold',
      color: colors.mainText,
    },
    cityText: {
      fontSize: 10,
      color: colors.gray,
    },
    emptySection: {
      alignSelf: 'center',
      marginTop: PHONE_HEIGHT * 0.3,
    },
  });
  return (
    <>
      {searchResult && searchResult.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.container}
          data={searchResult}
          renderItem={renderSearchResult}
          keyExtractor={item => item.id}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <View style={styles.emptySection}>
          <Icon
            name="search-off"
            type="material"
            size={PHONE_WIDTH * 0.15}
            color={colors.mainText}
          />
          <Text>No destination found for your search</Text>
        </View>
      )}
    </>
  );
};

export default SearchResults;
