import React from 'react';
import {  StyleSheet, ViewStyle, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const headStyles = StyleSheet.create({
    
    mainContainer : {
        flexDirection : 'column',
        alignItems: 'center',
        padding : 25,
        height : 200,
        marginBottom : 15

    },
   
   fisrtRow: {
    
     flexDirection :'row',
     justifyContent : 'space-around',
     width : screenWidth,
     padding :15
   },
   firstRowPic:{
    justifyContent : 'space-around',
    alignItems :'center',
    height : 110,
    },
    firstRowPicText : {
        fontWeight : '500'
    },
   firstRowInfo : {
    
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    padding: 10
    
   },
   firstRowInfoItem : {
        justifyContent : 'center',
        alignItems : 'center', 
        margin: 15    
   },
   firstRowItemTextNumber : {
        fontSize : 20,
        fontWeight : 'bold'
   },
   firstRowItemTextString : {
    fontSize : 15,
    fontWeight : '100'
},
   secondRowButton : {
    backgroundColor : '#f1f2f6',
    padding: 7,
    borderRadius : 7,
    width : 150,
    alignItems : 'center'
    
   },
   secondRowButtonText:{
      fontWeight : '400'
   }
   
    
  });