import { useContext, useEffect, useState } from 'react'
import {View, Text, TouchableOpacity,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import Replies from '../replies/Replies'
import Like from '../likes/Like'
import { IReply } from '../replies/ReplyType'
import { Icomment } from './CommentType'
import { PostContext } from '../../Context/PostContext'
import { commentStyles } from './Styles'
import { ILike } from '../likes/LikeTypes'
interface Props{
    setIsSendingReply : React.Dispatch<React.SetStateAction<boolean>>
    userName : string
    commentContent : string
    commentId : string
    commentLikes : ILike[]
    replies : IReply[]

}


const SingleComment : React.FC  <Props>= (props)=>{
   
   //props
   const setIsSendingReply = props.setIsSendingReply
   const userName = props.userName
   const commentContent = props.commentContent
   const commentId = props.commentId
   const commentLikes = props.commentLikes
   const replies = props.replies
   
   //local state
   const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false)

  //global state
   const postContext = useContext(PostContext)
   const comments = postContext.comments
   const setComments = postContext.setComments
   const setCommentId = postContext.setCommentId

    //function definitions
    

    const openReplies=(id: string)=>{
        setCommentId(id)
        setIsSendingReply(true)
        setIsRepliesOpen(true)

    }

   
   
    return( 
        
        
            <View>
                 <View style={commentStyles.displayCommentMainContainer}>
                      <View style={commentStyles.displayCommContentColumn}>
                        
                        <Text style={commentStyles.displayCommUser}>{userName}</Text>
                        <Text style={commentStyles.displayCommContent}>{commentContent}</Text>
                        <TouchableOpacity onPress={()=>openReplies(commentId)}>
                            <Text style={commentStyles.displayCommReplieText}>Replies</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={commentStyles.displayCommLikeColumn}>
                        <Like id = {commentId} collection = 'comments' arrayOfLikes={commentLikes}/> 
                      </View>
    
                  </View>
                 
                {
                    isRepliesOpen && 
                            <Replies 
                                commentId= {commentId} 
                                arrayOfReplies = {replies} 
                                setIsRepliesOpen = {setIsRepliesOpen}
                                setIsSendingReplies={setIsSendingReply} />
                } 
          
            </View>
                 
            
    )
}

export default SingleComment