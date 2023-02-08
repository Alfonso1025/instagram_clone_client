import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, TextInput} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { AuthContext } from '../../Context/AuthContext'
import { UserContext } from '../../Context/UserContext'
import TextArea from '../TextArea'

interface Props{
    postId : string
}
const TypeComment : React.FC  <Props>= (props)=>{
   
   //props
   const postId = props.postId
    
    //global state
    const authContext = useContext(AuthContext)
    const userId = authContext.userId
    const name = authContext.userName

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
        } catch (error) {
            console.log(error)
        }
    }

    return(

        <TextArea content = {content} setContent = {setContet} fetchFunction = {sendCommentToServer}/>
          
    )
}

export default TypeComment