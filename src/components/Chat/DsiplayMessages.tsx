import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/ChatContext';
import {View, Text, Button, Image, FlatList} from 'react-native'
import { IMessage } from './ChatTypes';
import {Socket} from 'socket.io-client'
import { chatStyles } from './Styles';


interface Props{
    socket : Socket
 }
 
const DisplayMessages : React.FC<Props> = (props)=>{
    
    //props
   const socket = props.socket
    
    //Global state
        const authContext = useContext(AuthContext)
        const userName = authContext.userName
        const chatContext = useContext(ChatContext)
        const messages = chatContext.messages
        const newMessages = chatContext.newMessages
        const setNewMessages = chatContext.setNewMessages
        
    //local state
    
    //function definitions
   

    useEffect(()=>{

        socket.on('receive_message', (data)=>{
        console.log('este es el mensaje',data)
        setNewMessages([...newMessages, data ])
        console.log(newMessages.length)

    })
}, [socket])
        
        
    return(
        <View style={chatStyles.displayMsgContainer}>
            {messages.length > 0 &&

                <FlatList
                  data={messages}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={item.author===userName?chatStyles.userStyle:chatStyles.participantStyle}>
                      
                        <Text>{item.content}</Text>
                    </View>
            )}
                        
        />       
            }
             {newMessages.length > 0 &&
                <FlatList
                data={newMessages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={item.author===userName?chatStyles.userStyle:chatStyles.participantStyle}>
                    
                      <Text>{item.content}</Text>
                  </View>
          )}
                      
      />       
            } 
            
        </View>
           
    )
}

export default DisplayMessages