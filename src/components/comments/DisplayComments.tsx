
import { useContext, useEffect, useState } from 'react'
import {View, Text, TouchableOpacity,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import Replies from '../replies/Replies'
import Like from '../likes/Like'
import { IReply } from '../replies/ReplyType'
import { Icomment } from './CommentType'
import SingleComment from './SingleComment'
import { PostContext } from '../../Context/PostContext'
import { commentStyles } from './Styles'


interface Props{
    postId : string
    setIsRepliesOpen :  React.Dispatch<React.SetStateAction<boolean>>
    isRepliesOpen : boolean    
    setIsSendingReply : React.Dispatch<React.SetStateAction<boolean>>
}


const DisplayComments : React.FC  <Props>= (props)=>{
   
   //props
   const postId = props.postId
   const setIsRepliesOpen = props.setIsRepliesOpen
   const isRepliesOpen = props.isRepliesOpen
   const setIsSendingReply = props.setIsSendingReply
   
   //local state
   const [status, setStatus] = useState<string>("")
    const [errMsg, setErrMsg] = useState<string>("oops something went wrong!")

  //global state
   const postContext = useContext(PostContext)
   const comments = postContext.comments
   const setComments = postContext.setComments
   const setCommentId = postContext.setCommentId

    //function definitions
    const getPostComments = async()=>{
        setStatus('LOADING')
        try {
            console.log('----------------------')
            console.log('this is the post id',postId)
            const response = await fetch(REMOTE_SERVER + `/comments/${postId}`)
            const parseResponse = await response.json()
            console.log('this is parseResponse',parseResponse)
            if(parseResponse.code == 200 && parseResponse.message ==='comments_retrieved'){
                setComments(parseResponse.data)
                setStatus('SUCCESS')
            }
            else if(parseResponse.code==200 && parseResponse.message ==='no_comments_yet'){
                setStatus('SUCCESS')
                setComments([])
                console.log('post has no comments yet')
            }
            else{
                setStatus('ERROR')
                
            }
            
    
        } catch (error) {
            setStatus('ERROR')
            if(error instanceof Error){
                setErrMsg(error.message)
            }
        }
    }

    const openReplies=(id: string)=>{
        setCommentId(id)
        setIsSendingReply(true)
        setIsRepliesOpen(true)

    }

    useEffect(()=>{
        getPostComments()
    }, []) 
    if(status === 'LOADING'){
        return  <Text>...LOADING</Text>
    }   
    if(status === 'ERROR'){
      return  <Text> {errMsg}</Text>
    } 
    return( 
        
        <FlatList
            data={comments}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 150 }}
            renderItem={({ item }) => (
                <SingleComment setIsSendingReply={setIsSendingReply}
                               userName={item.userName}
                               commentContent={item.commentContent}
                               commentId={item._id}
                               commentLikes={item.likes}
                               replies ={item.replies} />
            )}
                        
        />       
            
    )
}

export default DisplayComments