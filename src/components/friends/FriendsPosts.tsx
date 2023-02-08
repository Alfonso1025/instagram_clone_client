import { AuthContext } from '../../Context/AuthContext'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import Post from '../Post/Post'
import { IPost } from '../Post/PostTypes'


 //intefaces

 

interface Props{
    id : string
}

const FriendsPosts : React.FC <Props>  = (props)=>{
   //props
   const id = props.id
    
    //local state
    const [arrayOfPosts, setArrayOfPosts] = useState<IPost[]>([])
    const [status, setStatus] = useState<string>("")
    const [errMsg, setErrMsg] = useState<string>("")
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false)
    const [postId, setPostId] = useState<string>("")
    
    
    //function definitions
    const getPostsFromFollowingUsers = async():Promise<boolean>=>{
        setStatus('LOADING')
        try {
        
                const response = await fetch(REMOTE_SERVER+`/userPost/getPostsFromFollowingUsers/${id}`, {
                    method : 'GET',
                    headers : {'Content-Type': 'application/json'}
                    })
                const parseResponse = await response.text()
                const responseObject = JSON.parse(parseResponse)
           
                if(responseObject.data){
                    console.log(responseObject)
                    setArrayOfPosts(responseObject.data)
                    setStatus('SUCCESS')
                }      
        } catch (error) {
            console.log('this is the error',error)
            setStatus('ERROR')
            if(error instanceof Error){
               setErrMsg(error.message)
                
            }
            
        }    
        return true
    }

    const openComments=(id : string)=>{
        setPostId(id)
        setIsCommentsOpen(true)
    }

    useEffect(()=>{
            if(id){
                getPostsFromFollowingUsers()
            }
    },[id])

  if(status === 'LOADING'){
       return  <Text>...LOADING</Text>
  }  
  if(status === 'ERROR'){
     return  <Text>error : errMsg</Text>
  } 
  
 return(
    
        <View>
            <Post arrayOfPosts={arrayOfPosts}/>
        </View>
   
        
        
  )
 
}

export default FriendsPosts