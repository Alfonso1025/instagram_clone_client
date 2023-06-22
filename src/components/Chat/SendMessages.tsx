import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER, SOCKET_SERVER } from '@env';
import { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import { ChatContext } from '../../Context/ChatContext';
import { IMessage } from './ChatTypes';
import {Socket} from 'socket.io-client'
import { chatStyles } from './Styles';
import { Entypo } from '@expo/vector-icons';


interface Props{
   socket : Socket
}



const SendMessages : React.FC <Props> = (props)=>{
    
    //props
    const socket = props.socket
    
    //Global state
        const authContext = useContext(AuthContext)
        const id = authContext.userId
        const userName = authContext.userName
        const chatContext = useContext(ChatContext)
        const roomId = chatContext.roomId
        const newMessages = chatContext.newMessages
        const setNewMessages = chatContext.setNewMessages
        
    //local state
    const [currentMessage, setCurrentMessage] = useState<string>('')
    //function definitions
    const sendMessage = ()=>{

        console.log('sending message')
        if(currentMessage !== ''){
            
            const messageData = {
                roomId : roomId,
                author : userName,
                content : currentMessage,
                time : new Date(Date.now()).getHours + ":" + new Date(Date.now()).getMinutes
            }
            
            console.log('this is messagedata',messageData)
            socket.emit('send', messageData)
            setNewMessages([...newMessages, messageData])
        }
        setCurrentMessage('')
    }

      
        
        
    return(
        <View style={chatStyles.sendMessagesMainConatiner}>
            <View style={chatStyles.sendMessageFlexContainer}> 
                <View style={chatStyles.sendMsgFlexItemOne}>
                    <Entypo name="camera" size={30} color="#45aaf2" />
                    <TextInput placeholder='type a message...'
                            onChangeText={(value)=>{setCurrentMessage(value)}}
                            value = {currentMessage}
                            style = {chatStyles.input}/>
                </View>
                <View>
                    <TouchableOpacity onPress={ ()=>sendMessage() }>
                            <Text style={chatStyles.sendButtton}>Send</Text>
                    </TouchableOpacity>
                </View>
                
            
            </View>

            
        </View>
           
    )
}

export default SendMessages