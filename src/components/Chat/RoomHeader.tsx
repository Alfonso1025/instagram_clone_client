import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { REMOTE_SERVER, LOCAL_SERVER,SOCKET_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import {View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { chatStyles } from './Styles';
import { ChatContext } from '../../Context/ChatContext';


interface Props{
   participantName : string
   navigation : any
}

const RoomHeader : React.FC <Props> = (props)=>{
    
    //props
    const participantName = props.participantName
    const navigation = props.navigation
    console.log('from the roomHeader: this is the participant name: ',participantName)
    //const prevMessages = props.prevMessages
    
    //Global state
      const chatContext = useContext(ChatContext)  
      const setRoomId = chatContext.setRoomId

    //local state
     
      
    //function definitions
    const backToChats = ()=>{
          setRoomId('0')
          navigation.navigate('Chats')
    }
       
    return(
        <View style = {chatStyles.roomHeader}>
            <TouchableOpacity onPress={backToChats}>
                <Ionicons name="arrow-back-outline" size={28} color="black" />
            </TouchableOpacity>
            <Text style={chatStyles.roomHeaderUserName}>{participantName}</Text>
            <View></View>
         
        </View>
           
    )
}

export default RoomHeader