import {FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import BackHeader from '../../../components/headers/BackHeader';
import {Icon} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from 'react-native';
import {colors} from '../../../components/styles';
import styles from './styles';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const GalleryScreen = ({route}) => {
  const {t, i18n} = useTranslation();
  const {title, gallery} = route.params;
  const {colors} = useTheme();
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={Math.random()}
        style={styles.imageContainer}
        onPress={() => {
          setImageIndex(index);
          setOpenImageViewer(true);
        }}>
        <Image source={{uri: item.url}} style={styles.image} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <BackHeader
        title={i18n.language === 'ar' ? `صور ${title} ` : `${title} Gallery`}
      />
      <FlatList
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.mainBackground},
        ]}
        data={gallery}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
      />
      <Modal visible={openImageViewer} transparent={true}>
        {openImageViewer ? (
          <TouchableOpacity
            onPress={() => setOpenImageViewer(false)}
            style={styles.closeModalIcon}>
            <Icon
              name="close"
              type="ant-design"
              size={25}
              color={colors.light}
            />
          </TouchableOpacity>
        ) : null}
        <ImageViewer
          index={imageIndex}
          key={Math.random()}
          imageUrls={gallery}
          enableSwipeDown={true}
          onSwipeDown={() => setOpenImageViewer(false)}
        />
      </Modal>
    </>
  );
};

export default GalleryScreen;
