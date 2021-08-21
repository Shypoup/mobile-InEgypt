import { ActivityIndicator, Dimensions } from 'react-native';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../styles';
import React, { useState } from 'react';

import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { fetchAds } from '../../apis/home';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AutoCarousel = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true)
  const [ads, setAds] = useState([])
  const [width, setWidth] = useState(PHONE_WIDTH);

  const listAds = async () => {

    const response = await fetchAds(i18n.language)
    setAds(response)
    setLoading(false)

  }
  useEffect(() => {
    listAds()
  }, [])

  const _onLayout = event => {

    setWidth(event.nativeEvent.layout.width)

  };
  const renderAds = () => {

    return ads.map((item) => {
      return (
        // <View style={{ width: width, height: 225 }}>
        <ImageBackground

          source={{
            uri: item.poster,

          }}
          style={styles.itemContainer}
          imageStyle={styles.image}

        >
          <Text style={styles.label}>{item.content}</Text>
        </ImageBackground>
        // </View>
      )
    })
  }

  const styles = StyleSheet.create({
    itemContainer: {
      // flex: 1,
      // flexDirection: 'row',
      width: width,
      height: 225,
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      backgroundColor: colors.secondColor,
    },
    image: { height: '100%', width: '100%', justifyContent: 'flex-end' },
    label: {
      backgroundColor: colors.transparentWhite,
      fontSize: 16,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      paddingVertical: 5

    },
    paginationItem: {
      width: PHONE_WIDTH * 0.02,
      height: PHONE_WIDTH * 0.02,
      marginHorizontal: 2
    },
    loader: {
      marginVertical: PHONE_HEIGHT * 0.2
    }
  });

  return (
    <View onLayout={_onLayout} >
      <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={0}
        paginationActiveColor='#303c64' paginationDefaultColor={colors.gray}

      >
        {loading ? <ActivityIndicator color={colors.mainColor} size="small" style={styles.loader} /> :
          // <View style={{ width: width }}>
          <>
            {renderAds()}
          </>
          // </View>
        }

      </SwiperFlatList>
    </View>
  );
};


export default AutoCarousel;
