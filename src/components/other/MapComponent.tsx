import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import React from 'react';
import {colors} from '../styles';
import {useTranslation} from 'react-i18next';

const MapComponent = props => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.header}>{t('Map & Locations')}</Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(`geo://?q=${props.latitude},${props.longitude}`)
          }>
          <Text style={styles.showText}>{t('showOnMap')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.mapContainer}
          region={{
            latitude: +props.latitude,
            longitude: +props.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: +props.latitude,
              longitude: +props.longitude,
            }}></Marker>
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginBottom: '2%',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showText: {
    color: colors.linkText,
  },
  mapContainer: {
    height: 200,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginHorizontal: '3%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
    alignSelf: 'center',
  },
});

export default MapComponent;
