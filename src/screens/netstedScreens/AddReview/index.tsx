import { Button, Input, Overlay, Rating } from 'react-native-elements';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { addReviewRequest } from '../../../apis/destinations';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const AddReview = ({ navigation ,route }) => {
    const { t } = useTranslation();
    const [modalShow,setModalShow]=useState(false);
    const [username,setUserName]=useState('');
    const [review,setReview]=useState('');
    const [rate,setRate]=useState(0);
    const [message,setMessage]=useState('')
    const {id,image, name} =route.params;

    const addReview =async()=>{
        if (username === '') {
            setMessage(t('Your Name Required'))
            setModalShow(true)
        }else if(rate === 0){
            setMessage(t('Rate at least 1 Star'))
            setModalShow(true)
        }else if(review === ''){
            setMessage(t('Give A Comment Please'))
            setModalShow(true)
        }else{
        const response =await addReviewRequest(id,username, rate,review);
        if (response) {
            navigation.goBack();
            setMessage(t('Thanks for reviewing :)'))
            setModalShow(true)
            

        }else{
            setMessage(t('You already have a comment there'))
            setModalShow(true)
        }

    }


    }
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>{t('Cancel')}</Text>
                </TouchableOpacity>

                <Text style={styles.headerText}>{t('ADD A REVIEW')}</Text>

                <TouchableOpacity onPress={addReview}>
                    <Text style={styles.cancelText}>{t('Send')}</Text>
                </TouchableOpacity>
            </View>


            {/* Image */}

            <ImageBackground source={{uri: image}} imageStyle={styles.imageStyle} style={styles.image}>
                <View style={styles.imageHue}>
                <Text style={styles.destinationName}>{name}</Text>
                </View>

            </ImageBackground>


            {/* Rate */}
            <View style={styles.rate}>
            <Rating   startingValue={rate} onFinishRating={setRate} imageSize={30} />
            <Text style={styles.tapRate}>{t("Tap a Star to Rate")}</Text>
            </View>

            {/* Inputs */}
           
            <Input  
                value={username} 
                onChangeText={setUserName}
                label={t('Name')}
            />

            <Input  
                value={review} 
                onChangeText={setReview}
                label={t('Review')}
                
            />

        <Overlay 
            isVisible={modalShow}
            onBackdropPress={()=>setModalShow(!modalShow)}
            overlayStyle={styles.overlayContainer}
            >
        <Text >{message}</Text>
        <Button
            title={t('Done')}
            onPress={()=> setModalShow(false)}
            buttonStyle={styles.button}
            
            />
      </Overlay>
        </ScrollView>
    )
}

export default AddReview;