import {View, Text, Button,Image, FlatList} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { REMOTE_SERVER } from '@env'
import Post from './Post/Post'

interface Props {
    id : string
}
interface IPost{
    postId  : string
    contentString : string
    urls : string[]
}
const ProfilePosts : React.FC<Props> = (props)=>{
     
    //local state
    const [arrayOfPosts, setArrayOfPosts] = useState<IPost[]>([])
    //props
    const id = props.id
     
    //function definitions
    const getPosts = async():Promise<boolean>=>{
        try {
            const response = await fetch(REMOTE_SERVER + `/dashboard/getProfilePosts/${id}`)
            const parseResponse = await response.json()
            console.log(parseResponse.data)
            setArrayOfPosts(parseResponse.data)
        } catch (error) {
            console.log(error)
        }
        return true
    }
useEffect(()=>{
    if(id){
        getPosts()
    }
    
},[id])
 return(
     <View>
         
         <Post arrayOfPosts={arrayOfPosts}/>
         
    </View>
        
 )
}

export default ProfilePosts