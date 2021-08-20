import { Text, TouchableOpacity } from 'react-native'

import { Icon } from 'react-native-elements';
import React from 'react'
import { colors } from '../../styles';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

export const CategoryIcon = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('categories')}>
            <Icon type="ant-design" name="appstore1" size={25} color={colors.secondText} />
            <Text style={styles.iconText}>Categories</Text>
        </TouchableOpacity>
    )
}

