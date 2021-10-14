import { StyleSheet } from "react-native";
import { colors } from "../../../components/styles";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        paddingStart: '3%',
        flex:1


    },
    imageContainer: {
        width: '31%',
        height: 120,
        margin: 3,
    },
    image: {
        width: '100%',
        height: '100%',

        borderRadius: 5
    },
    closeModalIcon: {
        position: 'absolute',
        top: 30,
        right: 20,
        zIndex: 2
    }
})

export default styles;