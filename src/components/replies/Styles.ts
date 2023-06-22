import React from 'react';
import {  StyleSheet, ViewStyle, Dimensions } from 'react-native';

const screnWidth = Dimensions.get('window').width;

export const replyStyles = StyleSheet.create({
    mainReplyContainer: {
        flex:1,
        flexDirection : 'row',
     
        alignItems :'center',
        justifyContent: 'space-around',
        padding:20
    },
    replyContentContainer : {
       
        width : screnWidth-150,
        marginLeft: 50,
        marginBottom : 20
    },
    replyContentUserName : {
        fontSize : 12
    },
    replyContentText : {
        fontSize : 15
    }

    
    
  
    
})