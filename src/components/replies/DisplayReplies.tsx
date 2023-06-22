import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { IReply } from './ReplyType'
import { replyStyles } from './Styles'

interface Props{
    arrayOfReplies : IReply[]
}

const DisplayReplies : React.FC  <Props>= (props)=>{
   
   //props
   const arrayOfReplies = props.arrayOfReplies
   if(arrayOfReplies.length == 0) {
    return <Text>There are no replies for this comment</Text>
   }
    return( 
      
          
          <FlatList
            data={arrayOfReplies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            
                <View style={replyStyles.replyContentContainer}>
                    <Text style={replyStyles.replyContentUserName}>{item.userName}</Text>
                    <Text style={replyStyles.replyContentText}>{item.contentReply}</Text>
                </View>

         
            )}
                        
            />
    )
}

export default DisplayReplies