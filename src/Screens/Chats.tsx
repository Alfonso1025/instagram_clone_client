import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext';
import {View, Text, TouchableOpacity} from 'react-native'
import ActiveChats from '../components/Chat/ActiveChats';
import Room from './Room'; 
import { IChat } from '../components/Chat/ChatTypes';
import { AntDesign } from '@expo/vector-icons';
import { chatStyles } from '../components/Chat/Styles';
import Status from '../components/Status/Status';


type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chats'>

const Chats : React.FC <ChatScreenProps> = (props)=>{
    
    //props
    const navigation = props.navigation
    
    //Global state
        const authContext = useContext(AuthContext)
        const id = authContext.userId
        const chatContext = useContext(ChatContext)
        const setParticipantId = chatContext.setParticipantId
        const setParticipantName = chatContext.setParticipantName
        const roomId = chatContext.roomId
        const setRoomId = chatContext.setRoomId
        const setMessages = chatContext.setMessages
        const setNewMessages = chatContext.setNewMessages
        
       //local state
       const [allChats, setAllChats] = useState<IChat[]>([])
       const [status, setStatus] = useState<string>('')
       const [errMsg, setErrMsg] = useState<string>('')
       const [participant, setParticipant] = useState<string>('')

    //function definitions
    const getChats = async()=>{
        console.log('retriving chats')
        setStatus('LOADING')
        try {
            //each time the user leaves the room, the room info is cleared. Otherwise, when user
            //intended to start a new chat with a new participant, the old room info would remain
            //in the global state
            /* setParticipant('')
            setParticipantName('')
            setRoomId('') */
            console.log('id of the user whose chats will be retrieved', id)
            const response = await fetch(REMOTE_SERVER+`/chat/getRooms/${id}`)
            const parseResponse = await response.json()
            console.log('rooms',parseResponse)
            if(parseResponse.code == 200){
                setAllChats(parseResponse.data)
                setStatus('SUCCESS')
            }
            
            if(parseResponse.message === 'could_not_find_rooms'){
                    console.log('no hay mensajes')
                    setStatus('ERROR')
                    setErrMsg('You have no chats yet')
                }
            
           
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                setErrMsg(error.message)
            }
        }
    }
    const openRoom = (chat : IChat)=>{

            if(chat.participants[0].id === id){
                setParticipantId(chat.participants[1].id)
                setParticipantName(chat.participants[1].name)
            }
            else if(chat.participants[1].id === id){
                setParticipantId(chat.participants[0].id)
                setParticipantName(chat.participants[0].name)
            }
            setRoomId(chat._id)
            console.log(' from chats openRoom function those are the messages',chat.messages)
            setMessages(chat.messages)
            setNewMessages([])
            navigation.navigate('Room')
    }
    useEffect(()=>{
        getChats()
    },[roomId])

    console.log(status)
    if(status === 'LOADING'){
        return <Status message='...loading'/>
    }
    if(status === 'ERROR'){
        return <Status message='Error retrieving chats'/>
    }
    return(
        <View style={chatStyles.ListOfChatsMainContainer}>
             <Text>Messages</Text>
             {
                allChats.map((chat, index)=>{
                    return (
                        <View key={index} style={chatStyles.listItemContainer}>

                            <TouchableOpacity 
                                onPress={()=>openRoom(chat)}
                                style = {chatStyles.touchableOpacity}
                            >
                                <AntDesign name="user" size={40} color="black" />
                               {chat.participants[0].id === id 
                                    ? 
                                     <Text style={chatStyles.userNameText}>{chat.participants[1].name}</Text> 
                                    :
                                    <Text style={chatStyles.userNameText}>{chat.participants[0].name} </Text>
                                } 
                                
                            </TouchableOpacity>
                            <AntDesign name="instagram" size={30} color="grey" /> 

                        </View>
                        
                    )
                })
             }
        </View>
           
    )
}

export default Chats