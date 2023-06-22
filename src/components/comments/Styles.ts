import React from 'react';
import {  StyleSheet, ViewStyle, Dimensions } from 'react-native';

const screnWidth = Dimensions.get('window').width;

export const commentStyles = StyleSheet.create({
    mainCommentsContainer: {
        flex : 1,
        backgroundColor : 'white'  
    },
    secondCommentsContainer: {
        flex :1
    },
    displayCommentMainContainer:{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 30,
        marginLeft : 15,
        marginRight : 15
    },
    displayCommLikeColumn:{
        marginLeft :10
    },
    displayCommContentColumn : {
        width : screnWidth-100
    },
    displayCommUser : {
        fontWeight: 'bold',
        fontSize : 12
    },
    displayCommContent:{
       fontSize : 15
    }, 
    displayCommReplieText:{
        fontWeight : '200',
        fontSize : 12,
        marginTop: 7
    },
    typeCommentMainContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0, 
        height: 150,
        backgroundColor : 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },
    typeCommentSecondContainer : {
        borderTopWidth: .3,
        borderTopColor: 'lightgrey',
        borderTopStyle: 'solid',
        flexDirection :'row',
        width : screnWidth,
        justifyContent : 'center',
        alignItems : 'center'
    },
    textAreaMainContainer : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 20

    },
    textAreaInput : {
        
        width : screnWidth-150,
    }
    
    
  
    
})