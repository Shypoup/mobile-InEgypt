import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../styles';

import React from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const AutoCarousel = () => {



  return (
    <View>
      <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={0}
        paginationActiveColor='#303c64' paginationDefaultColor={colors.gray}
      >
      
        <View style={styles.itemContainer}>
          <ImageBackground

            source={{
              uri:
                'https://d2tyltutevw8th.cloudfront.net/media/image/egypt-south-1200-1603212169.png',
            }}
            style={styles.image}

          >
            <Text style={styles.label}>Hello to InEgypt app</Text>
          </ImageBackground>
        </View>
      </SwiperFlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondColor,
  },
  image: { height: '100%', width: '100%', justifyContent: 'flex-end' },
  label: {
    backgroundColor: colors.transparentWhite,
    fontSize: 18,
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
