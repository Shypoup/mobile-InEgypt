import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../../components/styles';
import React, { useState } from 'react';
import { fetchActivites, fetchCategories } from '../../../apis/categories';

import AppHeader from '../../../components/headers/AppHeader';
import { CategoryCard } from '../../../components/cards';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CategoriesScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState(null);
  const [activites, setActivites] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [activitesLoading, setActivitesLoading] = useState(true);

  const listCategories = async () => {
    const response = await fetchCategories(i18n.language);
    setCategories(response);
    setCategoriesLoading(false);
  }
  const listActivites = async () => {
    const response = await fetchActivites(i18n.language);
    setActivites(response);
    setActivitesLoading(false);
  }

  useEffect(() => {
    listCategories();
    listActivites();
  }, [])
  const renderCategories = () => {
    return categories.map((item) => {
      return (
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('listToCategory', { id: item.id, title: item.title })}>
          <CategoryCard name={item.title} image={item.poster} />
        </TouchableOpacity>
      );
    });
  };

  const renderActivites = () => {
    return activites.map((item) => {
      return (
        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('listToCategory', { id: item.id, title: item.title })}>
          <CategoryCard name={item.title} image={item.poster} />
        </TouchableOpacity>
      );
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {!showSearch ?
        <AppHeader
          middle={
            <Text style={styles.pageTitle}>{t('Categories')}</Text>
          }
          right={


            <TouchableOpacity style={styles.iconContainer} onPress={() => setShowSearch(true)}>
              <Icon name="search" type="feather" />
            </TouchableOpacity>

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
            cancelButtonTitle=''

          />
          <TouchableOpacity onPress={() => setShowSearch(false)}>
            <Text style={styles.cancelSearch}>{t('Cancel')}</Text>
          </TouchableOpacity>
        </View>
      }

      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{t('Categories')}</Text>
        </View>
        {categoriesLoading ? <ActivityIndicator color={colors.mainColor} style={styles.loader} /> :
          <View style={styles.container}>{renderCategories()}</View>
        }
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{t('Activities')}</Text>
        </View>
        {activitesLoading ? <ActivityIndicator color={colors.mainColor} style={styles.loader} /> :
          <View style={styles.container}>{renderActivites()}</View>
        }
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: PHONE_WIDTH * 0.0252,
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.mainText,
    marginTop: '3%'
  },
  SpotContainer: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: PHONE_WIDTH * 0.0252,
    paddingBottom: 100,
  },
  headerContainer: {
    backgroundColor: colors.light,
    width: PHONE_WIDTH,
    borderWidth: 0
  },
  header: {
    color: colors.mainText,
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: '5%'
  },
  flatList: {
    alignSelf: 'center',
    marginTop: 20,
  },
  iconContainer: {
    marginVertical: 8,
    marginHorizontal: 7,
  },

  //Search
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  searchAreaResult: {
    width: '80%',
    backgroundColor: '#fff',
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
  loader: {
    marginVertical: '40%',
    // backgroundColor: colors.light
  }

});
export default CategoriesScreen;
