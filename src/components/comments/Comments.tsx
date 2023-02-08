
import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import TypeComment from './TypeComment'
import DisplayComments from './DisplayComments'
import Replies from '../replies/Replies'
import { IReply } from '../replies/ReplyType'


interface Props{
    postId : string
    setIsCommentsOpen :  React.Dispatch<React.SetStateAction<boolean>>
}

const Comments : React.FC  <Props>= (props)=>{
   
   //props
   const postId = props.postId
   const setIsCommentsOpen = props.setIsCommentsOpen
   //local state
   const [commentId, setCommentId] = useState<string>("")
   const [arrayOfReplies, setArrayOfReplies] = useState<IReply[]>([])
   const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false)

    //function definitions

    return(

            <View>
                { !isRepliesOpen ?
                <View>
                    <TypeComment postId = {postId}/>
                    <DisplayComments 
                                    postId = {postId} 
                                    setIsCommentsOpen = {setIsCommentsOpen}
                                    setIsRepliesOpen = {setIsRepliesOpen}
                                    setCommentId = {setCommentId}
                                    setArrayOfReplies = {setArrayOfReplies}/>
                </View>
                :
                <View>
                    <Replies 
                            commentId= {commentId} 
                            arrayOfReplies = {arrayOfReplies} 
                            setIsRepliesOpen = {setIsRepliesOpen} />
                </View>
                
                }  
            </View>
    )
}

export default Comments