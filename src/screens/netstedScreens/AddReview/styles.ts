import { PHONE_HEIGHT, colors } from "../../../components/styles";

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBackground,
        height: PHONE_HEIGHT
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        borderBottomWidth: 0.5,
        borderColor: colors.lightGray
    },
    cancelText: {
        color: colors.linkText
    },
    headerText: {
        fontWeight: 'bold'
    }, 
    image:{
        width: '98%',
        height: 200,
        marginHorizontal:'2%',
        marginTop:'2%',
        
        
    },
    imageStyle:{
        borderRadius:10,
        
    },
    imageHue:{
        height: '100%',
        width: '100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        alignItems:'center',
        justifyContent:'center',
        
    },
    destinationName:{
        color: colors.light,
        fontWeight:'bold',
        fontSize:20,
        

    },
    rate:{
        marginVertical:'4%',
        alignSelf:'center'
    },
    tapRate:{
        color: colors.gray,
        fontSize:12,
        alignSelf:'center',
        marginTop:5
    },
    overlayContainer:{
        width: '70%',
        
        minHeight:'20%',
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:'5%'
    },
    button:{
        marginTop:'10%',
        paddingHorizontal:'20%',
        borderRadius:30
    }
})

export default styles;