import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Linecard, OverviewCard } from '../../../components/cards';
import {
  PHONE_HEIGHT,
  PHONE_WIDTH,
  colors,
  componetsStyles,
} from '../../../components/styles';
import { fetchCityAttractions, fetchCityDetails, fetchCitySpots } from '../../../apis/cites';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { attractions } from '../../../constants/api';
import { useEffect } from 'react';
import { useState } from 'react';

const CityDetails = ({ route, navigation }) => {
  const { id } = route.params;

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attractions, setAttractions] = useState(null);
  const [spots, setSpots] = useState(null);
  const [attractionsLoading, setAttractionsLoading] = useState(true);
  const [spotsLoading, setSpotsLoading] = useState(true);


  const getCityDetails = async () => {
    const response = await fetchCityDetails(id, 'en');
    setDetails(response);

    setLoading(false)
  }

  const getCityAttractions = async () => {
    const response = await fetchCityAttractions(id, 'en');
    setAttractions(response);

    setAttractionsLoading(false)
  }
  const getCitySpots = async () => {
    let spotsColumn = [];
    let spotsReshaped = [];
    const response = await fetchCitySpots(id, 'en');
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
      setSpots(spotsReshaped)
    }
    setSpotsLoading(false)


  }

  useEffect(() => {
    getCityDetails();
    getCityAttractions();
    getCitySpots()
  }, [])
  const renderAttractions = () => {
    return attractions.map((item) => {
      return (
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            navigation.navigate('destinationDetails', {
              item: item,
            })
          }>
          <OverviewCard name={item.name} image={item.poster} city={item.category} wide={true} />
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
            <Linecard name={item[0].name} image={item[0].poster} category={item[0].category} />
          </TouchableOpacity>

          <TouchableOpacity
            key={item[1].id}
            onPress={() =>
              navigation.navigate('destinationDetails', {
                item: item[1],
              })
            }>
            <Linecard name={item[1].name} image={item[1].poster} category={item[1].category} />
          </TouchableOpacity>



        </View>
      );
    });

  };
  return (
    <ScrollView>
      {loading ? <ActivityIndicator color={colors.mainColor} style={styles.loader} /> :
        <>
          <ImageBackground
            source={{
              uri: details.poster

            }}
            style={styles.image}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.pop()}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={35}
                color={colors.light}
              />

              {/* <Text style={styles.backtext}>Explore</Text> */}
            </TouchableOpacity>
            <View style={styles.contentAtImageContainer}>
              <View style={styles.cityNameContainer}>
                <Text style={styles.cityName}>{details.city}</Text>
                <View style={styles.mapContainer}>
                  <MaterialIcons name="map" size={34} color={colors.light} />
                  <Text style={styles.mapText}>Get Map</Text>
                </View>
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
                  <Text style={styles.infoText}>19° C </Text>
                </View>
              </View>
              <View style={styles.infoSection}>
                <FontAwesome name="bed" size={18} color={colors.light} />
                <Text style={styles.infoText}>
                  {details.residency}
                </Text>
              </View>
            </View>
          </ImageBackground>

          <View style={styles.whiteContainer}>
            <Text style={styles.title}>Overview</Text>
            <Text style={styles.overViewText}>
              {details.overview}
            </Text>

            <View style={styles.destinationHeader}>
              <Text style={styles.title}>Destination</Text>

              <TouchableOpacity onPress={() => navigation.navigate('destinations', { id, city: details.city })}>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            {attractionsLoading ? <ActivityIndicator color={colors.mainColor} /> :
              <>
                {attractions === null ? null :
                  <>
                    <Text style={styles.secondTitle}>Attractions</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                      {renderAttractions()}
                    </ScrollView>
                  </>

                }
              </>
            }


            {spotsLoading ? <ActivityIndicator color={colors.mainColor} /> :
              <>

                {spots === null ? null :
                  <>
                    <Text style={styles.secondTitle}>Spots</Text>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      style={styles.spotsConatiner}>
                      {renderSpots()}

                    </ScrollView>
                  </>
                }
              </>
            }
          </View>
        </>
      }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
  },
  backButton: {
    flexDirection: 'row',
    margin: 15,
  },
  backtext: {
    color: colors.light,
    fontSize: 15,
    alignSelf: 'center',
  },
  contentAtImageContainer: {
    marginHorizontal: 20,
  },
  cityNameContainer: {
    marginTop: PHONE_HEIGHT * 0.62,

    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.light,
    borderBottomWidth: 0.6,
    paddingBottom: 50,
  },
  cityName: {
    fontSize: 35,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: colors.light,
  },
  mapContainer: {
    alignItems: 'center',
  },
  mapText: {
    color: colors.light,
  },
  infoContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...componetsStyles.bigTitle,
    marginHorizontal: '5%',
    marginTop: '2%'
  },
  secondTitle: {
    ...componetsStyles.secondTitle,
    marginHorizontal: '5%',
  },
  infoText: {
    marginHorizontal: 5,
    color: colors.light,
    fontSize: 14,
  },
  whiteContainer: {
    backgroundColor: colors.light,
  },
  overViewText: {
    marginHorizontal: '7%',
    marginVertical: 10,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  seeAll: {
    color: colors.mainColor,
    marginHorizontal: '5%',
    marginVertical: 18,
  },
  spotsConatiner: {
    marginHorizontal: 25,
  },
  loader: {
    marginVertical: '40%'
  }
});
export default CityDetails;
