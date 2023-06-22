

import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import TypeComment from '../components/comments/TypeComment'
import DisplayComments from '../components/comments/DisplayComments'
import Replies from '../components/replies/Replies'
import { IReply } from '../components/replies/ReplyType'
import { PostContext } from '../Context/PostContext'
import { commentStyles } from '../components/comments/Styles'
import { Icomment } from '../components/comments/CommentType'

type CommentScreenProps = NativeStackScreenProps<RootStackParamList, 'Comments'>

const Comments : React.FC  <CommentScreenProps>= (props)=>{
   
   //props
   const navigation = props.navigation  
   //global state
   const postContext = useContext(PostContext)
   const postId = postContext.postId
   //local state
   const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false)
   const [isSendingReply, setIsSendingReply] = useState<boolean>(false)
   //function definitions

    return(
 
            <View style={commentStyles.mainCommentsContainer}>
                     <DisplayComments 
                                    postId = {postId} 
                                    setIsRepliesOpen = {setIsRepliesOpen}
                                    isRepliesOpen = {isRepliesOpen}
                                    setIsSendingReply = {setIsSendingReply}
                                     />
                    <TypeComment isSendingReply={isSendingReply} /> 
                     
            </View>
    )
}

export default Comments