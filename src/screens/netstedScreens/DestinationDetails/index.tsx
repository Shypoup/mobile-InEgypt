import { Icon, Overlay, Text } from 'react-native-elements';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import {
  colors,
  componetsStyles,
} from '../../../components/styles';
import { fetchDestinationDetails, fetchDestinationGallery, fetchReviews } from '../../../apis/destinations';

import { ActivityIndicator } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Review from '../../../components/other/Review';
import { noReviews } from '../../../constants/images'
import styles from './styles'
import { useEffect } from 'react';

const IMAGES = []
const DestinationDetails = ({ navigation, route }) => {
  const [overlayVisible, setOverlayVisibility] = useState(false);
  const [details, setDetails] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [reviews, setReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [gallery, setGallery] = useState(null)
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const toggleOverlay = () => {
    setOverlayVisibility(!overlayVisible);
  };
  const { id } = route.params;
  const getDestinationDetails = async () => {
    const response = await fetchDestinationDetails(id, 'en')
    setDetails(response)
    setDetailsLoading(false)
  }
  const listGallery = async () => {
    const response = await fetchDestinationGallery(id)

    setGallery(response)
    setGalleryLoading(false)
    for (let i = 0; i < response.length; i++) {
      IMAGES.push({ url: response[i].img })

    }
  }

  const listReviews = async () => {

    const response = await fetchReviews(id)
    console.log(response)
    setReviews(response)
    setReviewsLoading(false)

  }
  useEffect(() => {
    getDestinationDetails()
    listGallery()
    listReviews()
  }, [])

  // const images = [{
  //   // Simplest usage.
  //   url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

  //   width: 200,
  //   height: 200,
  //   // Optional, if you know the image size, you can set the optimization performance

  //   // You can pass props to <Image />.
  //   props: {
  //     // headers: ...
  //   }
  // }
  // ]

  const renderGallary = () => {
    return gallery.map((item, i) => {
      return (
        <TouchableOpacity onPress={() => {
          setImageIndex(i)
          setOpenImageViewer(true)
        }
        }>
          <Image key={i} style={styles.gallaryImage} source={{ uri: item.img }} />
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
      {detailsLoading ? <ActivityIndicator size="large" color={colors.mainColor} style={styles.loader} /> :
        <View style={styles.container}>

          <ImageBackground style={styles.bannerImage} source={{ uri: details.poster }}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.pop()}>
              <Icon
                type="material"
                name="keyboard-arrow-left"
                size={35}
                color={colors.secondIcon}
              />
            </TouchableOpacity>
            <Text style={styles.destinationType}>{details.type === "0" ? <>Attraction</> : <>Spot</>}</Text>
          </ImageBackground>


          {/* Title */}
          <View style={styles.headerSection}>
            <Text style={styles.nameHeader} >{details.name}</Text>
            {/* time */}
            <View style={styles.horizontalSection}>
              <Icon
                type='material-community'
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
                type='font-awesome'
                name="location-arrow"
                size={18}
                color={colors.gray}
                style={styles.headerIcon}

              />
              <Text style={styles.mainAttributes} numberOfLines={2}>{details.address}</Text>
            </View>
            {/* Tickets */}
            {details.ticket_price &&
              <>
                {details.ticket_price.egyptions &&
                  <View style={styles.horizontalSection}>
                    <Icon
                      type='font-awesome-5'
                      name="ticket-alt"
                      size={16}
                      color={colors.gray}
                      style={styles.headerIcon}

                    />
                    <Text style={styles.mainAttributes}>{details.ticket_price.egyptions} EGP / Egyptians</Text>
                  </View>
                }
              </>
            }

          </View>
          {/* Description */}

          <TouchableOpacity onPress={toggleOverlay}>
            <Text style={componetsStyles.boldTitle}>Description</Text>
            <Text style={componetsStyles.article}>{details.description.substring(1, 300 || details.description.length / 2)}

              <Text style={styles.more}>...More</Text></Text>
          </TouchableOpacity>
          <Overlay
            overlayStyle={styles.overlayContainer}
            isVisible={overlayVisible}
            onBackdropPress={toggleOverlay}>
            <ScrollView>
              <View style={styles.overlayHeader}>
                <View>
                  <Text style={componetsStyles.bigTitle}>Description</Text>
                  <Text style={componetsStyles.title}>{details.name}</Text>
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
              <Text style={componetsStyles.article}>{details.description}</Text>
            </ScrollView>
          </Overlay>

          {/* Galllary */}
          <View style={styles.sectionContainer}>
            <View style={styles.galleryHeaderSection}>
              <Text style={componetsStyles.boldTitle}>Gallery</Text>
              <TouchableOpacity onPress={() => navigation.navigate('galleryScreen', { title: details.name, gallery: IMAGES })}>
                <Text style={styles.more}>More</Text>
              </TouchableOpacity>
            </View>
            {galleryLoading ? <ActivityIndicator color={colors.mainColor} /> :
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {renderGallary()}
                <Modal visible={openImageViewer} transparent={true} >
                  {openImageViewer ?
                    <TouchableOpacity onPress={() => setOpenImageViewer(false)} style={styles.closeModalIcon}>
                      <Icon name='close' type='ant-design' size={25} color={colors.light} />
                    </TouchableOpacity>
                    : null}
                  <ImageViewer index={imageIndex} imageUrls={IMAGES} enableSwipeDown={true} onSwipeDown={() => setOpenImageViewer(false)}

                  />

                </Modal>
              </ScrollView>
            }
          </View>



          {/* Reviews */}

          <View style={styles.sectionContainer}>
            <Text style={componetsStyles.boldTitle}>Rating & Reviews</Text>
            {reviewsLoading ? <ActivityIndicator size="large" color={colors.mainColor} /> :
              <>
                {reviews.count === 0 ?
                  <View style={styles.emptyReviewsSection}>
                    <Image source={noReviews} style={styles.noReviewsImage} />
                    <Text style={styles.noReviewTitle}>No Reviews!</Text>
                    <Text style={styles.noReviewDesc}>Help the community and share your review</Text>
                  </View>
                  :
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {renderReviews()}
                  </ScrollView>
                }
              </>
            }
          </View>
          <TouchableOpacity style={styles.addReviewButton}>
            <Text style={styles.addReviewButtonText}>Add a review</Text>
          </TouchableOpacity>
          {/* <Button
            title="Add a review"
            type="outline"
            buttonStyle={styles.button}
            titleStyle={{ color: colors.mainColor }}
          /> */}

          {/* Tickets */}
          {details.ticket_price &&
            <>
              <Text style={componetsStyles.boldTitle}>Ticket Prices :</Text>
              {details.ticket_price.egyptions &&
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>Egyptionans: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.egyptions} EGP
                  </Text>
                </View>
              }
              {details.ticket_price.students &&

                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>Students: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.students} EGP
                  </Text>
                </View>
              }
              {details.ticket_price.foreign &&
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>Forigns: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.foreign} EGP
                  </Text>
                </View>
              }
              {details.ticket_price.foreignStudents &&
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>Forigns Students: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.foreignStudents} EGP
                  </Text>
                </View>
              }

              {details.ticket_price.caption &&
                <View style={styles.ticketSection}>
                  <Text style={styles.priceTitle}>Note: </Text>
                  <Text style={componetsStyles.article}>
                    {details.ticket_price.caption} EGP
                  </Text>
                </View>
              }

            </>
          }
        </View>
      }
    </ScrollView >
  );
};


export default DestinationDetails;
