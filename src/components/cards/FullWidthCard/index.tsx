import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../styles';
import React, { useEffect, useState } from 'react';

import { Icon } from 'react-native-elements'

export const FullWidthCard = (props) => {
  const [width, setWidth] = useState(PHONE_WIDTH * 0.95);
  const [hight, setHight] = useState(PHONE_HEIGHT * 0.25);
  const [font, setFont] = useState(18);

  useEffect(() => {
    if (props.view === 1) {
      setWidth(PHONE_WIDTH * 0.95);
      setHight(PHONE_HEIGHT * 0.25);
      setFont(16);
    } else if (props.view === 2) {
      setWidth((PHONE_WIDTH * 0.9) / 2);
      setHight(PHONE_HEIGHT * 0.18);
      setFont(14);
    } else if (props.view === 3) {
      setWidth((PHONE_WIDTH * 0.9) / 3);
      setHight(PHONE_HEIGHT * 0.15);
      setFont(12);
    }
  }, [props.view]);

  const styles = StyleSheet.create({
    container: {
      marginVertical: font * 0.7,
      marginHorizontal: font * 0.4,
      width: width,

    },
    image: {
      borderRadius: 50,
      width: '100%',
      height: hight,
    },
    temprature: {
      color: colors.light,
      fontSize: font,
      fontWeight: '900',
      alignSelf: 'flex-end',
      margin: 8,
    },
    name: {
      fontSize: font,
      fontWeight: 'bold',
      marginHorizontal: font * 0.5,
      marginVertical: font * 0.25,

    },
    kindContainer: {
      flexDirection: 'row',
      marginHorizontal: 8,
      alignItems: 'center'
    },
    kind: {
      color: colors.gray,
      marginHorizontal: 5,
      fontSize: font * 0.75,
    },
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: props.image,
        }}
        imageStyle={{ borderRadius: 10 }}
        style={styles.image}>
        <Text style={styles.temprature}>{props.temprature}° C</Text>
      </ImageBackground>
      <Text style={styles.name} numberOfLines={2}>{props.name}</Text>
      <View style={styles.kindContainer}>
        {props.category != null ? null : <Icon name="location-arrow" type="font-awesome" size={font} color={colors.gray} />
        }
        <Text style={styles.kind}>{props.category != null ? props.category : props.city}</Text>
      </View>
    </View>
  );
};

