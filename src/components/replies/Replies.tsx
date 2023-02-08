import { AuthContext } from '../../Context/AuthContext'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import DisplayReplies from './DisplayReplies'
import TypeReply from './TypeReply'
import { IReply } from '../comments/Comments'


 //intefaces


interface Props{
    commentId : string
    arrayOfReplies : IReply[]
    setIsRepliesOpen : React.Dispatch<React.SetStateAction<boolean>>
   
}

const Replies: React.FC <Props>  = (props)=>{
   //props
   const commentId = props.commentId
   const arrayOfReplies = props.arrayOfReplies
   const setIsRepliesOpen = props.setIsRepliesOpen
  

    //local state
    
  
 
 return(
    
    <View> 
       
       <Button title='Back to Comments' onPress={()=>{setIsRepliesOpen(false)}}/>  
        <TypeReply commentId = {commentId}/>
        <DisplayReplies  arrayOfReplies = {arrayOfReplies}/>
    </View>
          
  )
 
}

export default Replies