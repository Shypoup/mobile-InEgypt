import {
  ActivityIndicator,
  ImageBackground,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Linecard, OverviewCard} from '../../../components/cards';
import React, {useEffect, useState} from 'react';
import {
  fetchCityAttractions,
  fetchCityDetails,
  fetchCitySpots,
} from '../../../apis/cites';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../components/styles';
import {fetchTemperature} from '../../../apis/wheather';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const CityDetails = ({route, navigation}) => {
  const {id} = route.params;
  const {t, i18n} = useTranslation();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attractions, setAttractions] = useState(null);
  const [spots, setSpots] = useState(null);
  const [attractionsLoading, setAttractionsLoading] = useState(true);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [temperature, setTemperatue] = useState(null);
  const getTemprature = async (longitude, latitude) => {
    const response = await fetchTemperature(longitude, latitude);
    setTemperatue(response);
  };

  const getCityDetails = async () => {
    const response = await fetchCityDetails(id, i18n.language);
    setDetails(response);
    getTemprature(response.longitude, response.latitude);

    setLoading(false);
  };

  const getCityAttractions = async () => {
    const response = await fetchCityAttractions(id, i18n.language);
    setAttractions(response);

    setAttractionsLoading(false);
  };
  const getCitySpots = async () => {
    let spotsColumn = [];
    let spotsReshaped = [];
    const response = await fetchCitySpots(id, i18n.language);
    if (response != null) {
      let spotsOdd = response;
      spotsOdd.map((item, index) => {
        switch (index % 2) {
          case 0:
            spotsColumn.push(item);
            break;
          case 1:
            spotsColumn.push(item);
            spotsReshaped.push(spotsColumn);
            spotsColumn = [];
            break;
          default:
            break;
        }
      });
      setSpots(spotsReshaped);
    }
    setSpotsLoading(false);
  };

  useEffect(() => {
    getCityDetails();
    getCityAttractions();
    getCitySpots();
  }, []);
  const renderAttractions = () => {
    return attractions.map(item => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate('destinationDetails', {
              item: item,
            })
          }>
          <OverviewCard
            name={item.name}
            image={item.poster}
            city={item.category}
            wide={true}
          />
        </TouchableOpacity>
      );
    });
  };

  const renderSpots = () => {
    return spots.map((item, index) => {
      return (
        <View key={Math.random()}>
          <TouchableOpacity
            key={item[0].id}
            onPress={() =>
              navigation.navigate('destinationDetails', {
                item: item[0],
              })
            }>
            <Linecard
              name={item[0].name}
              image={item[0].poster}
              category={item[0].category}
            />
          </TouchableOpacity>

          <TouchableOpacity
            key={item[1].id}
            onPress={() =>
              navigation.navigate('destinationDetails', {
                item: item[1],
              })
            }>
            <Linecard
              name={item[1].name}
              image={item[1].poster}
              category={item[1].category}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator color={colors.mainColor} style={styles.loader} />
      ) : (
        <>
          <ImageBackground
            source={{
              uri: details.poster,
            }}
            style={styles.image}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.pop()}>
              <MaterialIcons
                name={
                  i18n.language === 'ar'
                    ? 'keyboard-arrow-right'
                    : 'keyboard-arrow-left'
                }
                size={35}
                color={colors.light}
              />

              {/* <Text style={styles.backtext}>Explore</Text> */}
            </TouchableOpacity>
            <View style={styles.contentAtImageContainer}>
              <View style={styles.cityNameContainer}>
                <Text style={styles.cityName}>{details.city}</Text>
                <TouchableOpacity
                  style={styles.mapContainer}
                  onPress={() =>
                    Linking.openURL(
                      `geo://?q=${details.latitude},${details.longitude}`,
                    )
                  }>
                  <MaterialIcons
                    name="location-pin"
                    size={34}
                    color={colors.light}
                  />
                  <Text style={styles.mapText}>{t('Get Map')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.infoSection}>
                  <MaterialCommunityIcons
                    name="steering"
                    size={24}
                    color={colors.light}
                  />
                  <Text style={styles.infoText}>{details.area} </Text>
                </View>

                <View style={styles.infoSection}>
                  <FontAwesome
                    name="user-circle-o"
                    size={18}
                    color={colors.light}
                  />
                  <Text style={styles.infoText}>{details.population}</Text>
                </View>

                <View style={styles.infoSection}>
                  <MaterialCommunityIcons
                    name="white-balance-sunny"
                    size={24}
                    color={colors.light}
                  />
                  <Text style={styles.infoText}>{temperature}° C </Text>
                </View>
              </View>
              <View style={styles.infoSection}>
                <FontAwesome name="bed" size={18} color={colors.light} />
                <Text style={styles.infoText}>{details.residency}</Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.whiteContainer}>
            <Text style={styles.title}>{t('Overview')}</Text>
            <Text style={styles.overViewText}>{details.overview}</Text>

            <View style={styles.destinationHeader}>
              <Text style={styles.title}>{t('Destinations')}</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('destinations', {id, city: details.city})
                }>
                <Text style={styles.seeAll}>{t('See All')}</Text>
              </TouchableOpacity>
            </View>

            {attractionsLoading ? (
              <ActivityIndicator color={colors.mainColor} />
            ) : (
              <>
                {attractions === null ? null : (
                  <>
                    <Text style={styles.secondTitle}>{t('Attractions')}</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {renderAttractions()}
                    </ScrollView>
                  </>
                )}
              </>
            )}

            {spotsLoading ? (
              <ActivityIndicator color={colors.mainColor} />
            ) : (
              <>
                {spots === null ? null : (
                  <>
                    <Text style={styles.secondTitle}>{t('Spots')}</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.spotsConatiner}>
                      {renderSpots()}
                    </ScrollView>
                  </>
                )}
              </>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default CityDetails;
