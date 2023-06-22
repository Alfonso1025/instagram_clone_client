import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, TextInput} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { AuthContext } from '../../Context/AuthContext'
import TextArea from './TextArea'
import ProfilePicture from '../Profile/ProfilePicture'
import { PostContext } from '../../Context/PostContext'
import { commentStyles } from './Styles'

interface Props{
    isSendingReply : boolean
}
const TypeComment : React.FC  <Props>= (props)=>{
   
   //props
    const isSendingReply = props.isSendingReply
    
    //global state
    const authContext = useContext(AuthContext)
    const userId = authContext.userId
    const name = authContext.userName
    const postContext = useContext(PostContext)
    const commentId = postContext.commentId
    const postId = postContext.postId

    //local state
    const [content, setContet] = useState <string>("")    

    //function definitions
    const sendCommentToServer = async()=>{
        try {
            const body = { relatedPost : postId, commentByUser : userId, userName : name, content }
            console.log('sending postid: ', postId)
            const response = await fetch(REMOTE_SERVER + '/comments', {
                method : 'POST',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)

            })
            const parseResponse = await response.json()
            console.log(parseResponse)
            setContet('')
           
        } catch (error) {
            console.log(error)
        }
    }

    const sendReplyToServer = async()=>{
        try {
            const body = {  commentId, content: content, userId, userName : name }
            const response = await fetch(REMOTE_SERVER + '/comments/addReply', {
                method : 'PUT',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)

            })
            const parseResponse = await response.json()
            setContet('')
            console.log(parseResponse)
        } catch (error) {
            console.log(error)
        } 
    }
    
    return(
        <View style={commentStyles.typeCommentMainContainer} >
            <View style= {commentStyles.typeCommentSecondContainer}>
                <ProfilePicture size='small'/>
                {!isSendingReply ?
                            <TextArea content = {content} 
                                      setContent = {setContet} 
                                      placeHolder = 'Add a comment...'
                                     fetchFunction = {sendCommentToServer}/>
                            :
                            <TextArea content = {content} 
                                      setContent = {setContet} 
                                      placeHolder = 'Add a reply...'
                                      fetchFunction = {sendReplyToServer}/>
                }
                
            </View>
                
                
          
        </View>
        
    )
}

export default TypeComment