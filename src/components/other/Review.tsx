import { Icon, Overlay, Rating } from 'react-native-elements';
import { PHONE_HEIGHT, PHONE_WIDTH, colors, componetsStyles } from '../styles';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Review = (props) => {
  const [overlayVisible, setOverlayVisibility] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisibility(!overlayVisible);
  };
  const renderStarts = () => {
    let stars = [];
    for (let i = 0; i < props.rate; i++) {
      stars.push(<Icon name="star" size={18} color={colors.mainColor} />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleOverlay}>
        <View style={styles.header}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <Rating imageSize={PHONE_WIDTH * 0.034} readonly startingValue={props.rate} style={styles.rating} tintColor={colors.lightGray} />
        <Text style={styles.reviewText} numberOfLines={7}>
          {props.comment}
        </Text>
      </TouchableOpacity>

      {/* Overlay */}
      <Overlay
        overlayStyle={styles.overlayContainer}
        isVisible={overlayVisible}
        onBackdropPress={toggleOverlay}>
        <ScrollView>
          <View style={styles.overlayHeader}>
            <View>
              <Text style={styles.overlayName}>{props.name}</Text>
              <Rating imageSize={PHONE_WIDTH * 0.05} readonly startingValue={props.rate} tintColor="#FFF" />
            </View>
            <TouchableOpacity onPress={toggleOverlay}>
              <Icon
                name="x"
                type="feather"
                size={35}
                color={colors.mainColor}
                style={styles.overlayExit}
              />
            </TouchableOpacity>
          </View>
          <Text style={componetsStyles.article}>{props.comment}</Text>
        </ScrollView>
      </Overlay>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: PHONE_WIDTH * 0.95,
    height: PHONE_HEIGHT * 0.25,
    backgroundColor: colors.lightGray,
    margin: 7,
    borderRadius: 15,
    padding: '4%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  name: {
    ...componetsStyles.title,

  },
  date: {
    ...componetsStyles.secondTitle,
    marginHorizontal: '3%'
  },

  rating: {
    backgroundColor: colors.lightGray,
    width: '20%',

  },
  reviewText: {

    marginTop: '2%'

  },
  overlayContainer: {
    width: PHONE_WIDTH * 0.94,
    paddingBottom: 30,
  },
  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    paddingBottom: 13,
    marginBottom: 20,
  },
  overlayName: {
    ...componetsStyles.bigTitle,
    marginBottom: '2%'
  },
  overlayExit: {
    marginTop: 15,
  },
});
export default Review;
