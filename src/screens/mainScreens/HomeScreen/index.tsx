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
import { fetchAroundYou, fetchRecommendedAttractions, fetchTopCategories, fetchTopCites, fetchTrendySpots } from '../../../apis/home';

import AutoCarousel from '../../../components/other/AutoCarousel';
import Geolocation from '@react-native-community/geolocation';
import { Icon } from 'react-native-elements';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import React from 'react';
import styles from './styles'
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [attractions, setAttractions] = useState([])
  const [spots, setSpots] = useState([])
  const [around, setAround] = useState([])
  const [cites, setCites] = useState([])

  const [categories, setCategories] = useState([])
  const [attractionsLoading, setAttractionsLoading] = useState(true)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [spotsLoading, setSpotsLoading] = useState(true)
  const [aroundLoading, setAroundLoading] = useState(true)
  const [citesLoading, setCitesLoading] = useState(true)
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState('');
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState('');


  async function requestLocationPermission() 
  {
    
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'InEgypt',
          message: t("locationAlertDescription"),
          buttonNeutral: t('askLater'),
          buttonNegative: t('Cancel'),
          buttonPositive: t('OK'),
        },
      )
      if (granted != PermissionsAndroid.RESULTS.GRANTED) {
        alert(t("locationAlertSetting"))
      }else{
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then((data) => {
            getOneTimeLocation()
          })
          .catch((err) => {
           
          });
      }
   
  }

  const getOneTimeLocation = () => {

    Geolocation.getCurrentPosition(
  
      
      (position) => {
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        const currentLatitude =
          JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
     
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

 


  const listRecommendedAtt = async () => {
    const response = await fetchRecommendedAttractions(i18n.language)
    setAttractions(response)
    setAttractionsLoading(false)

  }

  const listTrendySpots = async () => {
   
    const response = await fetchTrendySpots(i18n.language)
    setSpots(response)
    setSpotsLoading(false)
  }

  const listArround= async () => {
   if(currentLatitude != '' && currentLongitude != ''){
    
    const response = await fetchAroundYou(currentLatitude,currentLongitude,i18n.language)
    setAround(response)
    setAroundLoading(false)
   }
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
    requestLocationPermission()
    listTopCategories()
    listRecommendedAtt()
    listTrendySpots()
    listTopCites()
  }, [])
  useEffect(() => {
    listArround()
  }, [currentLongitude ,currentLatitude])



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
//render around ypu
    const renderAroundYou = () => {
    return around.map((item) => {
      return (
        <TouchableOpacity
          key={Math.random()}
          onPress={() =>
            navigation.navigate('destinationDetails', {
              id: item.id,
            })
          }>
          <OverviewCard name={item.name} image={item.poster} city={t('about') +" "+ Math.floor(+item.distance) +" " + t('km')} />
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
     
        <>
          {spotsLoading ? <ActivityIndicator color={colors.mainColor} size="small" style={styles.loader} /> :
            <HorizontalSection title={t("Trendy Spots")}
              renderFunction={renderTrendySpots} link={t('More')}
              to='destinations'
            />
          }
        </>

           {/* Around yoy */}
          {around &&around.length === 0 ?
          <>
          <Image source={require('../../../assets/noAround.png')}
            style={styles.noArroundImage}
          />
          <Text style={styles.noArroundText}>{t('No Destinations Around You!')}</Text>
          </>
        :
           <>
          {aroundLoading ? <ActivityIndicator color={colors.mainColor} size="small" style={styles.loader} /> :
            <HorizontalSection title={t("Around You")}
              renderFunction={renderAroundYou} link={t('More')}
              to='destinations'
            />
          }
        </>
}
        
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
