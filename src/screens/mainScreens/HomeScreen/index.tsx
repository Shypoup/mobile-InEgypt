import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { OverviewCard, OverviewCity } from '../../../components/cards';
import { colors, componetsStyles } from '../../../components/styles';
import { fetchAds, fetchRecommendedAttractions, fetchTopCategories, fetchTopCites, fetchTrendySpots } from '../../../apis/home';

import AutoCarousel from '../../../components/other/AutoCarousel';
import { Icon } from 'react-native-elements';
import React from 'react';
import styles from './styles'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import Geolocation from '@react-native-community/geolocation';

// import MapView from 'react-native-maps';






// Geolocation.getCurrentPosition(info => console.log(info));
const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [attractions, setAttractions] = useState([])
  const [spots, setSpots] = useState([])
  const [cites, setCites] = useState([])
  const [categories, setCategories] = useState([])
  const [attractionsLoading, setAttractionsLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [spotsLoading, setSpotsLoading] = useState(true)
  const [citesLoading, setCitesLoading] = useState(true)
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('...');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('...');
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  // useEffect(() => {
  //   const requestLocationPermission = async () => {

  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Access Required',
  //           message: 'This App needs to Access your location',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         //To Check, If Permission is granted
  //         getOneTimeLocation();
  //         subscribeLocationLocation();
  //       } else {
  //         setLocationStatus('Permission Denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }

  //   requestLocationPermission();
  //   return () => {

  //   };
  // }, []);

  // const getOneTimeLocation = () => {
  //   setLocationStatus('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     (position) => {
  //       setLocationStatus('You are Here');

  //       //getting the Longitude from the location json
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude =
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Longitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000
  //     },
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //   const watchID = Geolocation.watchPosition(
  //     (position) => {
  //       //Will give you the location on location change

  //       setLocationStatus('You are Here');
  //       console.log(position);

  //       //getting the Longitude from the location json        
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude =
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000
  //     },
  //   );
  // };


  const listRecommendedAtt = async () => {
    const response = await fetchRecommendedAttractions(i18n.language)
    setAttractions(response)
    setAttractionsLoading(false)

  }

  const listTrendySpots = async () => {
    setSpotsLoading(true)
    const response = await fetchTrendySpots(i18n.language)
    setSpots(response)
    setSpotsLoading(false)
  }

  const listTopCites = async () => {
    const response = await fetchTopCites(i18n.language)
    setCites(response)
    setCitesLoading(false)
  }

  const listTopCategories = async () => {
    const response = await fetchTopCategories(i18n.language)
    setCategories(response)
    setCategoriesLoading(false)
  }


  useEffect(() => {
    listTopCategories()
    listRecommendedAtt()
    listTrendySpots()
    listTopCites()
  }, [])

  // Render attractions
  const renderAttractionsOfMonth = () => {
    return attractions.map((item) => {
      return (
        <TouchableOpacity
          key={Math.random()}
          onPress={() =>
            navigation.navigate('destinationDetails', {
              id: item.id,
            })
          }>
          <OverviewCard name={item.name} image={item.poster} city={item.city} />
        </TouchableOpacity>
      );
    });
  };

  //RenderSpots
  const renderTrendySpots = () => {
    return spots.map((item) => {
      return (
        <TouchableOpacity
          key={Math.random()}
          onPress={() =>
            navigation.navigate('destinationDetails', {
              id: item.id,
            })
          }>
          <OverviewCard name={item.name} image={item.poster} city={item.city} />
        </TouchableOpacity>
      );
    });
  };

  //Render Categories
  const renderCategories = () => {
    return categories.map((item) => {
      return (
        <TouchableOpacity
          key={Math.random()}
          style={styles.iconContainer}
          onPress={() => navigation.navigate('listToCategory', { id: item.id, title: item.title })}>
          <Image source={{ uri: item.poster }} style={styles.categoryImage} />
          <Text style={styles.iconText}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  //Render Cites
  const renderCites = () => {
    return cites.map((item) => {
      return (
        <TouchableOpacity
          key={Math.random()}
          onPress={() =>
            navigation.navigate('cityDetails', {
              id: item.id,
            })


          }>
          <OverviewCity
            name={item.city}
            attractionsNo={item.count_att}
            spotsNo={item.count_spot}
            image={item.poster}
          />
        </TouchableOpacity>
      );
    });
  };

  const HorizontalSection = (props) => {
    return (
      <View style={styles.section}>
        <View style={styles.titleSection}>
          <Text style={componetsStyles.title}> {props.title}</Text>
          <TouchableOpacity onPress={() => navigation.navigate(props.to || 'home')}>
            <Text style={styles.more}>{props.link}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {props.renderFunction()}
          </ScrollView>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon type="feather" name="menu" />
        </TouchableOpacity>

        <Image source={require('../../../assets/logoBlack.png')} style={styles.appIcon} />

        <View />
      </View>
      <ScrollView>
        {/* ADS */}
        <AutoCarousel />

        {/* categories */}
        {/* {categories && categories.length > 0 ? */}
        <View style={styles.iconSection}>
          {categoriesLoading ? <ActivityIndicator color={colors.mainColor} size="small" /> :
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              {renderCategories()}

            </ScrollView>
          }
        </View>
        {/* : null} */}

        {/* Attractions */}
        {attractionsLoading ? <ActivityIndicator color={colors.mainColor} size="small" style={styles.loader} /> :
          <HorizontalSection title={t('Attraction Of The Month')}
            renderFunction={() => renderAttractionsOfMonth()} link={t('More')}
            to='destinations'
          />
        }
        {/* Spots */}
        {/* {spots && spots.length > 0 ? */}
        <>
          {spotsLoading ? <ActivityIndicator color={colors.mainColor} size="small" style={styles.loader} /> :
            <HorizontalSection title={t("Trendy Spots")}
              renderFunction={renderTrendySpots} link={t('More')}
              to='destinations'
            />
          }
        </>
        {/* : null} */}
        {/* <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ width: 420, height: 250 }}
        /> */}
        {/* Cites */}
        {citesLoading ? <ActivityIndicator color={colors.mainColor} size="small" style={styles.loader} /> :
          <>
            {cites && cites.length > 0 ?
              <HorizontalSection title={t("Explore Cities")}
                renderFunction={() => renderCites()} link={t('All Cities')}

                to="cites" />
              : null}
          </>
        }

      </ScrollView>
    </View>
  );
};


export default HomeScreen;
