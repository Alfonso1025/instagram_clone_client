import React from 'react';
import {  StyleSheet, ViewStyle, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const headerHeight = 80; // replace with actual header height
const footerHeight = 80; // replace with actual footer height
const flatListHeight = screenHeight - headerHeight - footerHeight;
const gridImageWidth = screenWidth/3

export const PostStyles = StyleSheet.create({
    
    flatList : {
        height:  flatListHeight,
        
    },
    postContainer : {
        marginBottom : 15,
       
    },
    
    imageContainer: {
        flex: 1, 
        width : screenWidth,
        alignItems: 'center',
        justifyContent : 'center',
        marginTop : 10,
        marginBottom : 10,
        height: 350,
        
    },
    image : {
        flex: 1, 
        width: screenWidth, 
        height: 350,
    },
    gridImage: {
        width : gridImageWidth,
        height : 150,
        margin: 1

    },

   contStringContainer : {
      flexDirection : 'row',
      marginTop:5
      
      
   },
   contString : {
        marginLeft : 7
   },
   author :{
        marginLeft : 25,
        fontWeight : 'bold'
   },
   iconsContainer : {
        marginLeft : 25,
        marginTop : 10,
        flexDirection : 'row'
   }
    
    
  });