import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ButtonGroup, Icon, SearchBar, Text } from 'react-native-elements';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../../components/styles';
import React, { useState } from 'react';

import AppHeader from '../../../components/headers/AppHeader';
import Destinations from './Destinations';
import SearchResults from './SearchResults';
import { fetchAttractions } from '../../../apis/destinations';
import { fetchCityDestinations } from '../../../apis/cites';
import { fetchSpots } from '../../../apis/destinations';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DestinationScreen = ({ route }) => {
  const { t, i18n } = useTranslation();
  // const { id } = route.params;
  const [selectedIndex, setIndex] = useState(0);
  const [view, setView] = useState(1);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [attractions, setAttractions] = useState(null);
  const [attractionLoading, setAttractionLoading] = useState(true);
  const [spots, setSpots] = useState([]);
  const [spotsLoading, setSpotsLoading] = useState(true);

  const listAttractions = async () => {
    const response = await fetchAttractions(i18n.language)
    setAttractions(response)
    setAttractionLoading(false)

  }

  const listSpots = async () => {
    const response = await fetchSpots(i18n.language)
    setSpots(response)
    setSpotsLoading(false)

  }

  const listCityDestinations = async () => {
    const response = await fetchCityDestinations(route.params.id, i18n.language)

    setAttractions(response.attraction);
    setAttractionLoading(false);
    setSpots(response.spot);
    setSpotsLoading(false);

  }
  useEffect(() => {
    if (typeof route.params === 'undefined') {
      listAttractions()
      listSpots()
    } else {
      listCityDestinations()
    }

  }, [])
  const updateIndex = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const changeView = () => {
    if (view === 3) {
      setView(1);
    } else {
      setView((v) => v + 1);
    }
  };
  const renderIcon = () => {
    let iconName = 'view-day';
    if (view === 1) {
      iconName = 'view-day';
    } else if (view === 2) {
      iconName = 'view-grid';
    } else {
      iconName = 'view-module';
    }
    return (
      <Icon
        name={iconName}
        type="material-community"
        size={28}
        color={colors.mainIcon}
      />
    );
  };
  const component1 = () => (
    <View>
      <Text>{t('Attraction')}</Text>
    </View>
  );
  const component2 = () => <Text>{t('Spots')}</Text>;

  const buttons = [{ element: component1 }, { element: component2 }];

  const renderScreen = () => {
    if (search.length > 0) {
      return <SearchResults search={search} />
    }
    else {

      if (selectedIndex === 0) {
        return (
          <>
            {attractionLoading ?
              <ActivityIndicator color={colors.mainColor} style={styles.laoder} />
              :
              <Destinations view={view} data={attractions} city={typeof route.params === 'undefined' ? null : route.params.city} />
            }
          </>
        )
      } else {
        return (
          <>
            {spotsLoading ?
              <ActivityIndicator color={colors.mainColor} style={styles.laoder} />
              :
              <Destinations view={view} data={spots} city={typeof route.params === 'undefined' ? null : route.params.city} />
            }
          </>
        )
      }



    }
  }
  return (
    <View style={styles.container}>
      {!showSearch ?
        <AppHeader
          middle={
            <ButtonGroup
              onPress={updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={styles.groupButtonsContainer}
              selectedButtonStyle={styles.selectedButton}
            />
          }
          right={
            <View style={styles.gridIconSection}>
              <TouchableOpacity onPress={changeView} style={styles.iconContainer}>
                {renderIcon()}
              </TouchableOpacity>
              {typeof route.params === 'undefined' ?
                <TouchableOpacity style={styles.iconContainer} onPress={() => setShowSearch(true)}>
                  <Icon name="search" type="feather" />
                </TouchableOpacity>

                : null}
            </View>
          }
        />
        :
        <View style={styles.searchSection}>
          <SearchBar
            autoFocus={true}
            placeholder={t("Search")}
            onChangeText={setSearch}
            value={search}
            containerStyle={styles.searchAreaResult}
            inputContainerStyle={styles.searchBar}
            inputStyle={styles.searchInput}
            searchIcon={<Icon name="ios-search-outline" type="ionicon" size={22} color={colors.secondText} />}
            returnKeyType="search"
            onSubmitEditing={() => {
              // navigation.navigate('productsList', search.length === 0 ? { query: null, name: 'All' } : { query: `name=${search}`, name: search })
              // handleHistory(search);
            }}
          />
          <TouchableOpacity onPress={() => setShowSearch(false)}>
            <Text style={styles.cancelSearch}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      }

      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBackground,
    flex: 1
  },
  groupButtonsContainer: {
    width: PHONE_WIDTH * 0.5,
    padding: 3,
    backgroundColor: colors.mediumGray,
    borderRadius: 7,
  },
  selectedButton: {
    backgroundColor: colors.light,
    borderRadius: 5,
  },
  iconContainer: {
    marginVertical: 8,
    marginHorizontal: 7,
  },
  gridIconSection: {
    flexDirection: 'row',
    marginHorizontal: '5%'
  },

  //Search
  searchSection: {
    flexDirection: 'row',
    backgroundColor: colors.light,
    alignItems: 'center',

  },
  searchAreaResult: {
    width: '80%',
    backgroundColor: colors.light,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginLeft: 10,


  },
  searchBar: {
    backgroundColor: colors.secondBackground,
    borderRadius: 10,
    paddingVertical: 0,
    height: PHONE_HEIGHT * 0.052,

  },
  searchInput: {
    fontSize: 14,
    color: colors.mainText,
    fontWeight: 'bold'
  },
  cancelSearch: {
    color: colors.linkText,
    fontSize: 16
  },
  laoder: {
    marginVertical: '30%'
  }

});
export default DestinationScreen;
