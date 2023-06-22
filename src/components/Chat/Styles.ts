import React from 'react';
import {  StyleSheet, ViewStyle, Dimensions } from 'react-native';


const screnWidth = Dimensions.get('window').width;

export const chatStyles = StyleSheet.create({
    ListOfChatsMainContainer: {
        flex : 1,
        backgroundColor : 'white',
        padding : 30
    },  
    listItemContainer : {
        flexDirection :'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 30
    },
    touchableOpacity : {
        flexDirection :'row',
        alignItems : 'center',     
    },
    userNameText: {
        fontWeight : 'bold',
        fontSize : 15,
        marginLeft : 10

    },
    roomMainContainer : {
        flex : 1,
        padding : 25,
        backgroundColor : 'white',
        
        
    },
    roomHeader : {
        paddingTop : 25,
        height : 100,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
      
    },
    roomHeaderUserName : {
        fontWeight: 'bold',
        fontSize : 15
        
    }, 
    displayMsgContainer: {
        //flex: 1,
      
    },
    userStyle : {
        alignSelf : 'flex-end',
        //width : screnWidth-200,
        backgroundColor : 'lightgrey',
        marginBottom : 15,
        borderRadius : 10,
        padding : 10,
        maxWidth : screnWidth/3
        
        
    },
    participantStyle : {
        alignSelf : 'flex-start',
        //width : screnWidth-200,
        backgroundColor : '#f1f2f6',
        marginBottom : 15,
        borderRadius : 10,
        padding : 10,
        maxWidth : screnWidth/2
    },
    sendMessagesMainConatiner : {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
        alignItems: 'center',
        justifyContent : 'center',
        backgroundColor : 'white'
      
   },
   sendMessageFlexContainer : {
       flexDirection : 'row',
       justifyContent : 'space-between',
       alignItems : 'center',
       width : screnWidth-50,
       paddingLeft : 8,
       paddingRight: 8,
       borderWidth : 1,
       borderColor : 'lightgrey',
       borderRadius : 25,
       minHeight : 70,
       height: 'auto',

      },
      sendMsgFlexItemOne: {
        flexDirection :'row',
        alignItems : 'center',
       
        

      },
      input : {
        marginLeft : 15,
         width : screnWidth-170,
         height : 'auto'
       
      },
      sendButtton : {
        color : '#45aaf2',
        fontSize : 20

      }


})