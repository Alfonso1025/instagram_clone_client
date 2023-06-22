import { AuthContext } from '../../Context/AuthContext'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { PostContext } from '../../Context/PostContext'
import { useState, useContext, useEffect } from 'react'
import Comments from '../../Screens/Comments'
import Like from '../likes/Like'
import { IPost } from './PostTypes'
import Carousel from './Carousel'
import { PostStyles } from './Styles'
import { EvilIcons } from '@expo/vector-icons'; 



interface Props{
    
    arrayOfPosts : IPost[]
    selectedIndex : number
    navigation : any

}

const Post : React.FC <Props>  = (props)=>{
   //props
    const arrayOfPosts = props.arrayOfPosts
    const selectedIndex = props.selectedIndex
    const navigation = props.navigation
    //local state
    
    //global state
   const postContext = useContext(PostContext)
   const setPostId = postContext.setPostId
    
    //functiondefinitions

    const openComments=(id : string)=>{
        console.log('opening comments screen with of posrId', id)
        setPostId(id)
        navigation.navigate('Comments')

    }

  
 
 return(
    
  <FlatList
  data={arrayOfPosts}
  initialScrollIndex={selectedIndex}
  contentContainerStyle={{ paddingBottom: 300 }}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={PostStyles.postContainer}>
          <Text  style={PostStyles.author}>{item.author}</Text>
          <Carousel urls={item.urls}/> 

          <View style={PostStyles.iconsContainer}>
               <Like id={item.postId} collection="userPost" arrayOfLikes={item.likes} />
               <TouchableOpacity onPress={()=>openComments(item.postId) }>
                  <EvilIcons name="comment" size={35} color="black" />
               </TouchableOpacity>
          </View>  

          <View style = {PostStyles.contStringContainer}>
               <Text style={PostStyles.author}>{item.author}</Text>
               <Text style={PostStyles.contString}>{item.contentString}</Text>
          </View>  
          
    </View>
  )}
  //style = {PostStyles.flatList}
/>

        
        
  )
 
}

export default Post