import { AuthContext } from '../../Context/AuthContext'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import Comments from '../comments/Comments'
import Like from '../likes/Like'
import { IPost } from './PostTypes'



interface Props{
    
    arrayOfPosts : IPost[]
}

const Post : React.FC <Props>  = (props)=>{
   //props
   
    const arrayOfPosts = props.arrayOfPosts
    //local state
    
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false)
    const [postId, setPostId] = useState<string>("")
    
    
    //functiondefinitions

    const openComments=(id : string)=>{
        setPostId(id)
        setIsCommentsOpen(true)
    }

  
 
 return(
    
    <View>
             
     
            {  ! isCommentsOpen ? 
              arrayOfPosts.map((post,index)=>{
                 //{contentString, urls}
                 return(
                    
                    <View key={index}>
                        
                        <View>
                          <Text>{post.contentString}</Text>
                           <FlatList
                               data = {post.urls}
                            renderItem={({item}) => {
                            return (
                               <View>
                                 <Image source={{ uri: item }} style={{ width: 50, height: 50 }} />
                
                               </View>
                             )
                                }}  
                            />
                           <Button title='Comments' onPress={()=>openComments(post.postId)}/> 
                           <Like id = {post.postId} collection ='userPost' arrayOfLikes={post.likes}/>
                        </View>
  
                    </View>
                        
                     
                )
               })
               :
               <View>
                   <Button title='Back' onPress={()=>{setIsCommentsOpen(false)}}/>
                   <Comments postId={postId} setIsCommentsOpen = {setIsCommentsOpen}/>
               </View>
           } 
                  
    </View>
        
        
  )
 
}

export default Post