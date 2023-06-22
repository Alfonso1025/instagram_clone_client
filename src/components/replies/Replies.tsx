import { AuthContext } from '../../Context/AuthContext'
import {View, Text, TouchableOpacity,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import DisplayReplies from './DisplayReplies'
import TypeReply from './TypeReply'
import { IReply } from './ReplyType'
import { Entypo } from '@expo/vector-icons';
import { replyStyles } from './Styles'


 //intefaces


interface Props{
    commentId : string
    arrayOfReplies : IReply[]
    setIsRepliesOpen : React.Dispatch<React.SetStateAction<boolean>>
    setIsSendingReplies : React.Dispatch<React.SetStateAction<boolean>>
   
}

const Replies: React.FC <Props>  = (props)=>{
   //props
   const commentId = props.commentId
   const arrayOfReplies = props.arrayOfReplies
   const setIsRepliesOpen = props.setIsRepliesOpen
   const setIsSendingReplies = props.setIsSendingReplies

    //local state
    
  //function definitions
  const closeReplies = ()=>{
    setIsRepliesOpen(false)
    setIsSendingReplies(false)
  }
 
 return(
    
    <View style={replyStyles.mainReplyContainer}> 
         <DisplayReplies  arrayOfReplies = {arrayOfReplies}/>
        <TouchableOpacity onPress={closeReplies}>
            <Entypo name="cross" size={24} color="black" />
         </TouchableOpacity>  
      
    </View>
          
  )
 
}

export default Replies