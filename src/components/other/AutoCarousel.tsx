import {ActivityIndicator, Dimensions} from 'react-native';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {PHONE_HEIGHT, PHONE_WIDTH, colors} from '../styles';
import React, {useState} from 'react';

import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {fetchAds} from '../../apis/home';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const AutoCarousel = () => {
  const {i18n} = useTranslation();
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [width, setWidth] = useState(PHONE_WIDTH);

  const listAds = async () => {
    const response = await fetchAds(i18n.language);
    setAds(response);
    setLoading(false);
  };
  useEffect(() => {
    listAds();
  }, []);

  const _onLayout = event => {
    setWidth(event.nativeEvent.layout.width);
  };
  const renderAds = () => {
    return ads.map(item => {
      return (
        <View style={styles.child} key={Math.random() + item.poster}>
          <ImageBackground
            source={{uri: item.poster}}
            style={styles.carsouelImage}>
            <Text style={styles.label}>{item.content}</Text>
          </ImageBackground>
        </View>
      );
    });
  };

  const styles = StyleSheet.create({
    carsouelContainer: {
      height: PHONE_HEIGHT * 0.3,
    },
    child: {width: PHONE_WIDTH, justifyContent: 'center'},

    carsouelImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
    },

    label: {
      backgroundColor: colors.transparentWhite,
      fontSize: 16,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '50%',
      marginHorizontal: 10,
    },

    loader: {
      marginVertical: PHONE_HEIGHT * 0.2,
    },
  });

  return (
    <View>
      <View style={styles.carsouelContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.mainColor}
            style={styles.loader}
          />
        ) : (
          <SwiperFlatList autoplay autoplayDelay={3} autoplayLoop index={0}>
            {renderAds()}
          </SwiperFlatList>
        )}
      </View>
    </View>
  );
};

export default AutoCarousel;
