import {
  I18nManager,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RNRestart from 'react-native-restart';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {colors} from '../components/styles';
import {useTranslation} from 'react-i18next';

const DrawerContent = props => {
  const {t, i18n} = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar').then(() => {
      I18nManager.forceRTL(i18n.language === 'ar');
      SplashScreen.show();
      RNRestart.Restart();
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logoBlack.png')}
          style={styles.appIcon}
        />
      </View>
      <Text style={styles.title}>InEgypt</Text>
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('destinations')}>
          <Text style={styles.option}>{t('Destinations')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('categories')}>
          <Text style={styles.option}>{t('Categories')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('cites')}>
          <Text style={styles.option}>{t('Cities')}</Text>
        </TouchableOpacity>
      </View>

      {/* Setting */}

      <View style={styles.section}>
        <TouchableOpacity onPress={changeLanguage}>
          <Text style={styles.option}>{t('Language')}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.option}>{t('dark')}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.option}>{t('About Us')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.version}>{t('Version No.')} 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 60,
  },
  header: {
    height: 90,
  },
  appIcon: {
    width: 80,
    height: 60,
    alignSelf: 'center',
    marginTop: '5%',
  },
  title: {
    color: colors.secondText,
    marginVertical: 10,
    marginHorizontal: '11%',
  },
  section: {
    marginHorizontal: '10%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  option: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    marginHorizontal: 4,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    borderBottomColor: colors.mediumGray,
  },
  version: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 2,
    marginHorizontal: 4,
    color: colors.gray,
    alignSelf: 'center',
  },
});

export default DrawerContent;
