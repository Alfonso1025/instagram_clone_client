import React from 'react';
import {  StyleSheet, ViewStyle } from 'react-native';


export const footStyles = StyleSheet.create({
    mainContainer : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor : 'white',
        alignItems: 'center',
        justifyContent: 'center',
    
       
    },
   iconsWrapper : {
       
        
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding : 20,
        width : 350,
        height : 80
   },
   profPicWrapper : {
    borderRadius : 20,
    backgroundColor :'red'
   }
  
    
    
    
  });