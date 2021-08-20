import { PHONE_HEIGHT, PHONE_WIDTH, colors, componetsStyles } from '../../../components/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    bannerImage: {
        height: PHONE_HEIGHT * 0.4,
        width: '100%',
    },
    loader: {
        alignSelf: 'center',
        marginTop: '50%'
    },

    backButton: {
        flexDirection: 'row',
        margin: 15,
    },
    destinationType: {
        fontSize: 16,
        backgroundColor: 'rgba(221,255,221,0.8)',
        color: '#1c521c',
        position: 'absolute',
        bottom: 5,
        right: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        margin: 5,
        borderRadius: 2
    },
    headerSection: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-start',
        backgroundColor: colors.light,
        marginVertical: 20,
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: '8%',
        elevation: 10,
        borderRadius: 15,

    },
    nameHeader: {
        marginVertical: '3%',
        fontWeight: 'bold',
        fontSize: 17
    },
    headerIcon: {
        marginEnd: 10
    },
    mainAttributes: {
        color: colors.gray,
        fontSize: 14,
        marginTop: '-2%'


    },
    horizontalSection: {
        flexDirection: 'row',
        marginVertical: '2.5%',
        marginEnd: '4%',
        alignItems: 'flex-start',

    },
    time: {
        color: colors.gray,

        fontSize: 16,
    },

    overlayContainer: {
        width: PHONE_WIDTH * 0.94,
        paddingBottom: 30,
    },
    overlayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 8,
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
        paddingBottom: 13,
        marginBottom: 20,
    },
    overlayExit: {
        marginTop: 15,
    },
    sectionContainer: {
        marginVertical: 30,
        marginHorizontal: 10,
    },
    galleryHeaderSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginEnd: '3%'
    },
    gallaryImage: {
        width: PHONE_HEIGHT * 0.35,
        height: PHONE_HEIGHT * 0.21,
        margin: 8,
        borderRadius: 10,
    },
    ticketSection: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: PHONE_WIDTH * 0.95,
        alignSelf: 'center',
        marginBottom: 15,
        paddingVertical: 13,

        borderColor: colors.mainColor,
    },
    more: {
        color: colors.linkText
    },
    priceTitle: {
        ...componetsStyles.title,
        marginHorizontal: '5%'
    },
    emptyReviewsSection: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    noReviewsImage: {
        resizeMode: 'contain',
        width: 400,
        height: 100
    },
    noReviewTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    noReviewDesc: {
        textAlign: 'center',
        fontSize: 13
    },
    addReviewButton: {
        width: '95%',
        borderWidth: 1,
        borderColor: colors.mainColor,
        paddingVertical: '3.5%',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: '4%'
    },
    addReviewButtonText: {
        color: colors.mainColor
    },
    closeModalIcon: {
        position: 'absolute',

        top: 30,
        right: 20,

        zIndex: 2
    }
});

export default styles