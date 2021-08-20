import { PHONE_HEIGHT, PHONE_WIDTH, colors } from '../styles';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const BackHeader = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                    name="keyboard-arrow-left"
                    size={35}
                    color={colors.mainColor}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: PHONE_WIDTH,
        height: PHONE_HEIGHT * 0.09,
        backgroundColor: colors.transparentWhite,
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 20
    },
    middlecomponent: {
        marginHorizontal: PHONE_WIDTH * 0.16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: '30%'
    },
    icon: {
        marginHorizontal: 10,
    },
});
export default BackHeader;
