import {Icon, Overlay, Rating} from 'react-native-elements';
import {PHONE_HEIGHT, PHONE_WIDTH, colors, componetsStyles} from '../styles';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useTheme} from '@react-navigation/native';

const Review = props => {
  const {colors} = useTheme();
  const [overlayVisible, setOverlayVisibility] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisibility(!overlayVisible);
  };

  const styles = StyleSheet.create({
    container: {
      width: PHONE_WIDTH * 0.95,
      height: PHONE_HEIGHT * 0.25,
      backgroundColor: colors.secondBackground,
      margin: 7,
      borderRadius: 15,
      padding: '4%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      color: colors.mainText,
    },
    name: {
      ...componetsStyles.title,
      color: colors.mainText,
    },
    date: {
      ...componetsStyles.secondTitle,
      marginHorizontal: '3%',
      color: colors.mainText,
    },

    rating: {
      backgroundColor: colors.secondBackground,
      width: '20%',
    },
    reviewText: {
      marginTop: '2%',
      color: colors.mainText,
    },
    overlayContainer: {
      width: PHONE_WIDTH * 0.94,
      paddingBottom: 30,
      backgroundColor: colors.secondBackground,
    },
    overlayHeader: {
      backgroundColor: colors.secondBackground,
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
      marginBottom: '2%',
      color: colors.mainText,
    },
    overlayExit: {
      marginTop: 15,
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleOverlay}>
        <View style={styles.header}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <Rating
          imageSize={PHONE_WIDTH * 0.034}
          readonly
          startingValue={props.rate}
          style={styles.rating}
          tintColor={colors.secondBackground}
        />
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
              <Rating
                imageSize={PHONE_WIDTH * 0.05}
                readonly
                startingValue={props.rate}
                tintColor={colors.secondBackground}
              />
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

export default Review;
