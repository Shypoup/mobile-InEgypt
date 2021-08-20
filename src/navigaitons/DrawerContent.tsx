import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import React from 'react';
import { colors } from '../components/styles';

const DrawerContent = (props) => {


    return (
        <View style={styles.container}>
            <View style={styles.header} >
                <Image source={require('../assets/logoBlack.png')} style={styles.appIcon} />
            </View>
            <Text style={styles.title}>INEgypt</Text>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => props.navigation.navigate('destinations')}>
                    <Text style={styles.option}>Destinations</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('categories')}>
                    <Text style={styles.option}>Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate('cites')}>
                    <Text style={styles.option}>Cites</Text>
                </TouchableOpacity>
            </View>

            {/* Setting */}
            <Text style={styles.title}>SETTING</Text>
            <View style={styles.section}>
                <TouchableOpacity >
                    <Text style={styles.option}>عربي</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.option}>Dark</Text>
                </TouchableOpacity>

            </View>

            {/* Policy */}
            <Text style={styles.title}>ABOUT US</Text>
            <View style={styles.section}>
                <TouchableOpacity >
                    <Text style={styles.option}>Privacy & Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.option}>About us</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.option}>Rate us</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.section}>

                <Text style={styles.version}>App Version 1.0.0(1)</Text>

            </View>
        </View>
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
        height: 80,
        alignSelf: 'center'
    },
    title: {
        color: colors.secondText,
        marginVertical: 10,
        marginHorizontal: '11%',
    },
    section: {
        backgroundColor: colors.secondBackground,
        marginHorizontal: '10%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    option: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
        marginHorizontal: 4
    },
    version: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 2,
        marginHorizontal: 4,
        color: colors.gray,
        alignSelf: 'center'
    }

});

export default DrawerContent;
