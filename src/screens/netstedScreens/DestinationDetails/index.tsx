import {Icon, Overlay, Text} from 'react-native-elements';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, componetsStyles} from '../../../components/styles';
import {
  fetchDestinationDetails,
  fetchDestinationGallery,
  fetchReviews,
} from '../../../apis/destinations';

import {ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapComponent from '../../../components/other/MapComponent';
import Review from '../../../components/other/Review';
import {noReviews} from '../../../constants/images';
import styles from './styles';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';

const DestinationDetails = ({navigation, route}) => {
  const {t, i18n} = useTranslation();
  const [overlayVisible, setOverlayVisibility] = useState(false);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [gallery, setGallery] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const toggleOverlay = () => {
    setOverlayVisibility(!overlayVisible);
  };
  const {id} = route.params;
  const getDestinationDetails = async () => {
    const response = await fetchDestinationDetails(id, i18n.language);
    setDetails(response);
    setDetailsLoading(false);
  };
  const listGallery = async () => {
    let images = [];
    const response = await fetchDestinationGallery(id);
    for (let i = 0; i < response.length; i++) {
      images.push({url: response[i].img});
    }
    setGallery(images);

    setGalleryLoading(false);
  };

  const listReviews = async () => {
    const response = await fetchReviews(id);

    setReviews(response);
    setReviewsLoading(false);
  };
  useEffect(() => {
    getDestinationDetails();
    listGallery();
    listReviews();
  }, [navigation]);

  const renderGallary = () => {
    return gallery.map((item, i) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setImageIndex(i);
            setOpenImageViewer(true);
          }}>
          <Image key={i} style={styles.gallaryImage} source={{uri: item.url}} />
        </TouchableOpacity>
      );
    });
  };

  const renderReviews = () => {
    return reviews.review.map((review, i) => {
      return (
        <Review
          key={Math.random()}
          name={review.username}
          date={review.date}
          rate={+review.rate}
          comment={review.review}
        />
      );
    });
  };
  return (
    <ScrollView>
      {detailsLoading ? (
        <ActivityIndicator
          size="small"
          color={colors.mainColor}
          style={styles.loader}
        />
      ) : (
        <View style={styles.container}>
          <ImageBackground
            style={styles.bannerImage}
            source={{uri: details.poster}}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.pop()}>
              <Icon
                type="material"
                name={
                  i18n.language === 'ar'
                    ? 'keyboard-arrow-right'
                    : 'keyboard-arrow-left'
                }
                size={35}
                color={colors.light}
              />
            </TouchableOpacity>
            <Text style={styles.destinationType}>
              {details.type === '0' ? <>{t('Attraction')}</> : <>{t('Spot')}</>}
            </Text>
          </ImageBackground>

          {/* Title */}
          <View style={styles.headerSection}>
            <Text style={styles.nameHeader}>{details.name}</Text>
            {/* time */}
            <View style={styles.horizontalSection}>
              <Icon
                type="material-community"
                name="clock-time-nine"
                size={18}
                color={colors.gray}
                style={styles.headerIcon}
              />

              <Text style={styles.time}>{details.from}</Text>
              <Text style={styles.time}> - </Text>
              <Text style={styles.time}>{details.to}</Text>
            </View>

            {/* Area */}
            <View style={styles.horizontalSection}>
              <Icon
                type="font-awesome"
                name="location-arrow"
                size={18}
                color={colors.gray}
                style={styles.headerIcon}
              />
              <Text style={styles.mainAttributes} numberOfLines={2}>
                {details.address}
              </Text>
            </View>
            {/* Tickets */}
            {details.ticket_price && (
              <>
                {details.ticket_price.egyptions && (
                  <View style={styles.horizontalSection}>
                    <Icon
                      type="font-awesome-5"
                      name="ticket-alt"
                      size={16}
                      color={colors.gray}
                      style={styles.headerIcon}
                    />
                    <Text style={styles.mainAttributes}>
                      {details.ticket_price.egyptions} {t('EGP')}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
          {/* Description */}

          <TouchableOpacity onPress={toggleOverlay}>
            <Text style={componetsStyles.boldTitle}>{t('Description')}</Text>
            <Text style={componetsStyles.article}>
              {details.description.substring(
                1,
                300 || details.description.length / 2,
              )}

              <Text style={styles.more}>...{t('More')}</Text>
            </Text>
          </TouchableOpacity>
          <Overlay
            overlayStyle={styles.overlayContainer}
            isVisible={overlayVisible}
            onBackdropPress={toggleOverlay}>
            <ScrollView>
              <View style={styles.overlayHeader}>
                <View>
                  <Text style={componetsStyles.bigTitle}>
                    {t('Description')}
                  </Text>
                  <Text style={componetsStyles.title}>{details.name}</Text>
                </View>
                <TouchableOpacity onPress={toggleOverlay}>
                  <Icon
                    name="x"
                    type="feather"
                    size={32}
                    color={colors.mainColor}
                    style={styles.overlayExit}
                  />
                </TouchableOpacity>
              </View>
              <Text style={componetsStyles.article}>{details.description}</Text>
            </ScrollView>
          </Overlay>

          {/* Galllary */}
          <View style={styles.sectionContainer}>
            <View style={styles.galleryHeaderSection}>
              <Text style={componetsStyles.boldTitle}>{t('Gallery')}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('galleryScreen', {
                    title: details.name,
                    gallery,
                  })
                }>
                <Text style={styles.more}>{t('More')}</Text>
              </TouchableOpacity>
            </View>
            {galleryLoading ? (
              <ActivityIndicator color={colors.mainColor} />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderGallary()}
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
                    imageUrls={gallery}
                    enableSwipeDown={true}
                    onSwipeDown={() => setOpenImageViewer(false)}
                  />
                </Modal>
              </ScrollView>
            )}
          </View>

          {/* Map */}
          <MapComponent
            longitude={details.longitude}
            latitude={details.latitude}
          />
          {/* Reviews */}

          <View style={styles.sectionContainer}>
            <Text style={componetsStyles.boldTitle}>
              {t('Rating & Reviews')}
            </Text>
            {reviewsLoading ? (
              <ActivityIndicator size="large" color={colors.mainColor} />
            ) : (
              <>
                {reviews.count === 0 ? (
                  <View style={styles.emptyReviewsSection}>
                    <Image source={noReviews} style={styles.noReviewsImage} />
                    <Text style={styles.noReviewTitle}>{t('No Reviews!')}</Text>
                    <Text style={styles.noReviewDesc}>
                      {t('Help the community and share your thoughts')}
                    </Text>
                  </View>
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderReviews()}
                  </ScrollView>
                )}
              </>
            )}
          </View>
          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={() =>
              navigation.navigate('addReview', {
                id,
                image: details.poster,
                name: details.name,
              })
            }>
            <Text style={styles.addReviewButtonText}>{t('Add a Review')}</Text>
          </TouchableOpacity>

          {/* Tickets */}
          {details.ticket_price && (
            <>
              <Text style={componetsStyles.boldTitle}>
                {t('Ticket Prices')}:
              </Text>
              {details.ticket_price.egyptions && (
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>{t('Egyptions')}: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.egyptions} {t('EGP')}
                  </Text>
                </View>
              )}
              {details.ticket_price.students && (
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>{t('Students')}: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.students} {t('EGP')}
                  </Text>
                </View>
              )}
              {details.ticket_price.foreign && (
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>{t('Forigns')}: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.foreign} {t('EGP')}
                  </Text>
                </View>
              )}
              {details.ticket_price.foreignStudents && (
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>
                    {t('Forign Students')}:{' '}
                  </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.foreignStudents} {t('EGP')}
                  </Text>
                </View>
              )}

              {details.ticket_price.caption && (
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}></Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.caption} {t('EGP')}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default DestinationDetails;
