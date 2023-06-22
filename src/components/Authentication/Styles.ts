import React from 'react';
import {  StyleSheet, ViewStyle } from 'react-native';


export const authStyles = StyleSheet.create({
    mainContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'white'

    },
   
    imageContainer: {
     
      flex : 3,
      alignItems : 'center',
      justifyContent : 'center',
      marginBottom : 10
    
    
    },
    image : {
        height : 100,
        width : 250
    },
    inputContainer : {
        flex : 7,
        alignItems : 'center',
        justifyContent : 'flex-start',
       
    },
    input : {
        
        height : 55,
        width : 325,
        borderWidth : 3,
        borderColor : '#dcdde1',
        borderRadius : 5,
        marginBottom : 15,
        backgroundColor : '#f5f6fa',
        padding : 15,
        fontSize : 20
    },
    mainButton :{
        marginTop : 20,
        width : 325,
        height : 55,
        backgroundColor : '#00a8ff',
        paddingTop : 10,
        borderRadius :15
        
    },
    mainButtonText : {
        
        textAlign: 'center',
        textAlignVertical: 'center',
        color : 'white',
        fontSize : 25
    },
    footerContainer : {
        marginTop : 80,
        flex : 1,
        flexDirection : 'row',
      
    },
    footerText : {
        fontSize : 20,
        marginRight : 10
    },
    footerButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize : 25,
        color : '#00a8ff'
    }
  });