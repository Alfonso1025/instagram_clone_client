import { AuthContext } from '../../Context/AuthContext'
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import Comments from '../../Screens/Comments'
import Like from '../likes/Like'
import { IPost } from './PostTypes'
import Carousel from './Carousel'
import { PostStyles } from './Styles'
import { EvilIcons } from '@expo/vector-icons'; 



interface Props{
    
    arrayOfPosts : IPost[]
    setSelectedIndex : React.Dispatch<React.SetStateAction<number>>
    setRenderGrid : React.Dispatch<React.SetStateAction<boolean>>
}

const GridPost : React.FC <Props>  = (props)=>{
   //props
    const setSelectedIndex = props.setSelectedIndex
    const arrayOfPosts = props.arrayOfPosts
    const setRenderGrid = props.setRenderGrid
    //local state
    
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false)
    const [postId, setPostId] = useState<string>("")
    
    
    //functiondefinitions

    const openComments=(id : string)=>{
        setPostId(id)
        setIsCommentsOpen(true)
    }

    const displayColumn =(imageIndex: number)=>{
      setSelectedIndex(imageIndex)
      setRenderGrid(false)
  }
 
 return(
    
  <FlatList
  data={arrayOfPosts}
  numColumns={3}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item, index }) => (
    <View>
          <TouchableOpacity onPress={() => displayColumn(index)}>
              <Image source={{ uri: item.urls[0] }} style={PostStyles.gridImage} />
          </TouchableOpacity>
                
    </View>
  )}
  style = {PostStyles.flatList}
/>

        
        
  )
 
}

export default GridPost