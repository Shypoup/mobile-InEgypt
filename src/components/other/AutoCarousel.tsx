import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../styles';
import React, { useState } from 'react';

import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { fetchAds } from '../../apis/home';
import { useEffect } from 'react';

const AutoCarousel = () => {
  const [ads, setAds] = useState([])

  const listAds = async () => {

    const response = await fetchAds('en')
    setAds(response)

  }
  useEffect(() => {
    listAds()
  }, [])

  const renderAds = () => {

    return ads.map((item) => {
      return (
        <ImageBackground

          source={{
            uri: item.poster,

          }}
          style={styles.itemContainer}

        >
          <Text style={styles.label}>{item.title}</Text>
        </ImageBackground>
      )
    })
  }

  return (
    <View>
      <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={0}
        paginationActiveColor='#303c64' paginationDefaultColor={colors.gray}
      // horizontal contentContainerStyle={styles.itemContainer}
      >

        {/* <View style={styles.itemContainer}> */}
        {renderAds()}
        {/* </View> */}
      </SwiperFlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT * 0.25,
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
});

export default AutoCarousel;
