import { PHONE_HEIGHT, colors, componetsStyles } from "./../../../components/styles"

import { PHONE_WIDTH } from '../../../components/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: PHONE_HEIGHT,
    },
    backButton: {
        flexDirection: 'row',
        margin: 15,
    },
    backtext: {
        color: colors.light,
        fontSize: 15,
        alignSelf: 'center',
    },
    contentAtImageContainer: {
        marginHorizontal: 20,
    },
    cityNameContainer: {
        marginTop: PHONE_HEIGHT * 0.67,

        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.light,
        borderBottomWidth: 0.6,
        paddingBottom: 20,
    },
    cityName: {
        fontSize: 35,
        fontWeight: 'bold',
        marginHorizontal: 8,
        color: colors.light,
    },
    mapContainer: {
        alignItems: 'center',
    },
    mapText: {
        color: colors.light,
    },
    infoContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        ...componetsStyles.bigTitle,
        marginHorizontal: '7%',
        marginTop: '3%'
    },
    secondTitle: {
        ...componetsStyles.secondTitle,
        marginHorizontal: '7%',
        marginTop: '2%'
    },

    infoText: {
        marginHorizontal: 5,
        color: colors.light,
        fontSize: 14,
    },
    whiteContainer: {
        backgroundColor: colors.light,
    },
    overViewText: {
        marginHorizontal: '7%',
        marginVertical: 10,
    },
    destinationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '3%'
    },
    seeAll: {
        color: colors.mainColor,
        marginHorizontal: '5%',
        // marginVertical: 18,
    },
    spotsConatiner: {
        marginHorizontal: 25,
    },
    loader: {
        marginVertical: '40%'
    }
});

export default styles;