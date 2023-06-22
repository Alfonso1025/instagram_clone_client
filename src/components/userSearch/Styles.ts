import React from 'react';
import {  StyleSheet, ViewStyle, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width
export const searchStyles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    },
    searchMainContainer : {
        width : screenWidth-20,
        flexDirection : 'row',
        alignItems : 'center',
        padding :10,
        marginLeft : 10,
        marginTop : 10,
        borderRadius : 8,
        backgroundColor : '#f1f2f6',
        height : 50
    },
    input :{
        flex : 8,
        height : 50
    },
    user: {
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 15,
        flexDirection : 'row',
        alignItems : 'center'
        
     },
     userName:{
        marginLeft: 10,
        fontSize: 20
     },
     userImage: {
        borderRadius : 40,
        width : 50,
        height :50
     }


  });