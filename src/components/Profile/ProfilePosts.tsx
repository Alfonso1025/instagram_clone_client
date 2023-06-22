import {View, Text, Button,Image, FlatList} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { REMOTE_SERVER } from '@env'
import Post from '../Post/Post'
import GridPost from '../Post/GridPost'
import { IPost } from '../Post/PostTypes'

interface Props {
    id : string
    navigation : any
}

const ProfilePosts : React.FC<Props> = (props)=>{
     
    //local state
    const [status, setStatus] = useState<string>("")
    const [errMsg, setErrMsg] = useState<string>("")
    const [arrayOfPosts, setArrayOfPosts] = useState<IPost[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number>(1)
    const [renderGrid, setRenderGrid] =  useState<boolean>(true)
    //props
    const id = props.id
    const navigation = props.navigation
      
    //function definitions
    const getPosts = async():Promise<boolean>=>{
        setStatus('LOADING')
        try {
            const response = await fetch(REMOTE_SERVER + `/dashboard/getProfilePosts/${id}`)
            const parseResponse = await response.json()
            console.log('this is the parse response from profileposts:', parseResponse)
            if(parseResponse.code === 200){
                console.log('post were retrived succesfully')
                setArrayOfPosts(parseResponse.data)
                setStatus('SUCCESS')
            }
            else if(parseResponse.code == 200 && parseResponse.message==='no_posts_found'){
                setStatus('ERROR')
                setErrMsg('No posts yet')
            }
           
        } catch (error) { 
            console.log(error)
            setStatus('ERROR')
            if(error instanceof Error){
               setErrMsg(error.message)
                
            }
        }
        return true
    }
    
useEffect(()=>{
    if(id){
        getPosts()
    }
    
},[id])

if(status === 'LOADING'){
    return  <Text>...LOADING</Text>
}  
if(status === 'ERROR'){
  return  <Text>error: {errMsg}</Text>
} 
 return(
    
         <View>
           {/*  {renderGrid ?
                        <GridPost 
                             arrayOfPosts={arrayOfPosts} 
                             setSelectedIndex={setSelectedIndex}
                             setRenderGrid={setRenderGrid}/> 
                      :
                        <Post 
                             arrayOfPosts={arrayOfPosts}
                             selectedIndex={selectedIndex}
                             navigation = {navigation}/>  
            }  */}
        </View>

     
         
       
         
    
        
 )
}

export default ProfilePosts