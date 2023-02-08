import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import { IReply } from '../comments/Comments'

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
        <View> 
        
               {
                    arrayOfReplies.map((reply, index)=>{
                        return(
                            <View>
                                <Text>{reply.userName}</Text>
                                <Text>{reply.contentReply}</Text>
                            </View>
                            
                        )
                    })
                }
                
         </View>
            
    )
}

export default DisplayReplies