import { AuthContext } from '../../Context/AuthContext'
import {View, Text,Image, FlatList, ScrollView, Dimensions} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { useState, useContext, useEffect } from 'react'
import Comments from '../../Screens/Comments'
import Like from '../likes/Like'
import { IPost } from './PostTypes'
import { PostStyles } from './Styles'



interface Props{
    
    urls : string[]
}

const Carousel : React.FC <Props>  = (props)=>{
   //props
   
    const urls = props.urls
    //local state
    
    //functiondefinitions

  
    
  
 
 return(
    
    <ScrollView horizontal>
        <FlatList
        data={urls}
        keyExtractor={(url, index) => index.toString()}
        horizontal={true}
        renderItem={({ item: url }) => {
          return (
            <View style={PostStyles.imageContainer}>
              <Image source={{ uri: url }} style={PostStyles.image} />
            </View>
          );
        }}
        />       
    </ScrollView>
      
  )
 
}

export default Carousel