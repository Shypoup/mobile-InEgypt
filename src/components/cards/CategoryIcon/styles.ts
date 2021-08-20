import { PHONE_WIDTH, colors } from '../../../components/styles';

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    // Categories
    iconSection: {
        marginVertical: 20,
        flexDirection: 'row',
        marginHorizontal: 5,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'center'

    },
    iconContainer: {
        backgroundColor: colors.lightGray,
        marginHorizontal: 3,
        marginVertical: 5,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10

    },

    iconText: {
        color: colors.secondText,
        fontSize: 11,
        marginTop: 5,
        fontWeight: 'bold'
    },


});

export default styles;