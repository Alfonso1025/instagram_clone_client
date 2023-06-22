import { AuthContext } from '../../Context/AuthContext'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import Post from '../Post/Post'
import Status from '../Status/Status'
import { IPost } from '../Post/PostTypes'
import GridPost from '../Post/GridPost'


 //intefaces

 

interface Props{
    id : string  
    navigation : any 
}

const FriendsPosts : React.FC <Props>  = (props)=>{
   //props
   const id = props.id
   const navigation = props.navigation
    console.log('user id', id)
    //local state
    const [arrayOfPosts, setArrayOfPosts] = useState<IPost[]>([])
    const [status, setStatus] = useState<string>("wow")
    const [errMsg, setErrMsg] = useState<string>("")
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false)
    const [postId, setPostId] = useState<string>("")
    const [selectedIndex, setSelectedIndex] = useState<number>(1)
    const [areTherePosts, setAreTherePost] = useState<boolean>(false)
   
    
    
    //function definitions
    const getPostsFromFollowingUsers = async():Promise<boolean>=>{
        console.log('getting posts')
        setStatus('LOADING')
        try { 
        
                const response = await fetch(REMOTE_SERVER+`/userPost/getPostsFromFollowingUsers/${id}`, {
                    method : 'GET',
                    headers : {'Content-Type': 'application/json'}
                    })
                //const parseResponse = await response.text()
                //const responseObject = JSON.parse(parseResponse)
                const responseObject = await response.json()
                
                //error
                if(responseObject.code !== 200){
                    setStatus('ERROR')
                    return false
                }
                //successful request but user is not following any friends
                if(responseObject.data === null){
                    
                    setStatus('NOPOSTS')
                    return true
                }
                if(responseObject.data){
                   
                    setArrayOfPosts(responseObject.data)
                    setStatus('SUCCESS')
                }      
        } catch (error) {
            console.log('this is the error from dashboard',error)
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
             getPostsFromFollowingUsers()
        
    },[])
  
  if(status === 'LOADING'){
       return <Status message='...Loading'/>
  }  
  if(status === 'ERROR'){
     return   <Status message='There was an error. We are working on fixing the issue. Try again later'/>
  } 
  if(status === 'NOPOSTS'){
     return  <Status message='You have no friends yet'/>
  }
  console.log('this is the sttaus: ', status)
 return(
    
        <View>
            
            <Post 
                arrayOfPosts={arrayOfPosts}
                selectedIndex={selectedIndex}
                navigation={navigation}/>        
        </View>
   
        
        
  )
 
}

export default FriendsPosts