
import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import Replies from '../replies/Replies'
import Like from '../likes/Like'
import { IReply } from '../replies/ReplyType'
import { Icomment } from './CommentType'


interface Props{
    postId : string
    setIsCommentsOpen :  React.Dispatch<React.SetStateAction<boolean>>
    setIsRepliesOpen :  React.Dispatch<React.SetStateAction<boolean>>
    setCommentId : React.Dispatch<React.SetStateAction<string>>
    setArrayOfReplies : React.Dispatch<React.SetStateAction<IReply[]>>
}


const DisplayComments : React.FC  <Props>= (props)=>{
   
   //props
   const postId = props.postId
   const setIsCommentsOpen = props.setIsCommentsOpen
   const setIsRepliesOpen = props.setIsRepliesOpen
   const setCommentId = props.setCommentId
   const setArrayOfReplies = props.setArrayOfReplies
   
   //local state
   const [areThereComments, setAreThereComments] = useState<boolean>(true)
   const [comments, setComments] = useState<Icomment[]>([])
   
   
    //function definitions
    const getPostComments = async()=>{
        try {
           
            const response = await fetch(REMOTE_SERVER + `/comments/${postId}`)
            const parseResponse = await response.json()
            console.log(parseResponse)
            if(parseResponse.data === null || parseResponse.message === 'no_comments_yet'){
                setAreThereComments(false)
            }
            else{
                setComments(parseResponse.data)
            }


        } catch (error) {
            console.log(error)
        }
    }

    const openReplies=(id : string, replies : IReply[])=>{
        setCommentId(id)
        setArrayOfReplies(replies)
        setIsRepliesOpen(true)
    }

    useEffect(()=>{
        getPostComments()
    }, []) 
    return( 
        <View> 
          
          
           
           {
            !areThereComments ? 
            <View>
                <Text>There are no comments for this post {postId} </Text>
                  
            </View>
            :
            <View>
                {
                    comments.map((comment, index)=>{
                        return(
                            <View>
                                <Text>{comment.userName}</Text>
                                <Text>{comment.commentContent}</Text>
                                <Button title='Replies' onPress={()=>openReplies(comment._id, comment.replies)}/>
                                <Like id = {comment._id} collection = 'comments' arrayOfLikes={comment.likes}/>
                            </View>
                            
                        )
                    })
                }
              
            </View>
         }

        </View> 
    

        

         
            
    )
}

export default DisplayComments