import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, TextInput} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { AuthContext } from '../../Context/AuthContext'
import { UserContext } from '../../Context/FriendContext'
import TextArea from '../comments/TextArea'

interface Props{
    commentId : string
}
const TypeReply : React.FC  <Props>= (props)=>{
   
   //props
   const commentId = props.commentId
    
    //global state
    const authContext = useContext(AuthContext)
    const userId = authContext.userId
    const name = authContext.userName

    //local state
    const [replyContent, setReplyContet] = useState <string>("")    

    //function definitions
    const sendReplyToServer = async()=>{
        try {
            const body = {  commentId, content: replyContent, userId, userName : name }
            const response = await fetch(REMOTE_SERVER + '/comments/addReply', {
                method : 'PUT',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)

            })
            const parseResponse = await response.json()
            console.log(parseResponse)
        } catch (error) {
            console.log(error)
        }
    }

    return(
               <TextArea content = {replyContent} setContent = {setReplyContet} fetchFunction = {sendReplyToServer}/>
           /*  <View>
                <TextInput  multiline={true}
                            numberOfLines={5}
                            onChangeText = {(value)=>{setReplyContet(value)}}
                            value = {replyContent}
                            
                            />
                <Button title='Send Reply' onPress={sendReplyToServer}/>
            </View> */
    )
}

export default TypeReply