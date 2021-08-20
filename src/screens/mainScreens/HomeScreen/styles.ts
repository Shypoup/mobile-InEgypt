import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../../../components/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
    },
    // Header
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: PHONE_WIDTH * 0.06,
        paddingTop: 10,
        alignItems: 'center'
    },
    appIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginVertical: 5
    },

    // Categories
    iconSection: {
        marginVertical: '5%',
        flexDirection: 'row',
        marginHorizontal: 5,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center'

    },
    iconContainer: {
        backgroundColor: colors.lightGray,
        marginHorizontal: 3,
        marginVertical: 3,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        width: PHONE_WIDTH * 0.22,
        height: PHONE_WIDTH * 0.2,
        padding: '2%'

    },

    iconText: {
        color: colors.secondText,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    categoryImage: {
        width: 40,
        height: 40
    },

    //Title
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15
    },
    more: {
        color: colors.linkText
    },
    //Section
    section: {
        marginTop: 5,
        marginBottom: 20
    },
    loader: {
        marginVertical: PHONE_HEIGHT * 0.1
    }
});

export default styles;