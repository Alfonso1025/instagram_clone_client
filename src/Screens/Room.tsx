import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList';
import { REMOTE_SERVER, LOCAL_SERVER,SOCKET_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import {View, Text, Button, Image, SafeAreaView} from 'react-native'
import { IChat } from '../components/Chat/ChatTypes';
import { IMessage } from '../components/Chat/ChatTypes';
import { ChatContext } from '../Context/ChatContext';
import { FriendContext } from '../Context/FriendContext';
import SendMessages from '../components/Chat/SendMessages';
import DisplayMessages from '../components/Chat/DsiplayMessages';
import {io} from 'socket.io-client'
import { chatStyles } from '../components/Chat/Styles';
import RoomHeader from '../components/Chat/RoomHeader';
import Status from '../components/Status/Status';

const socket = io('')

type RoomScreenProps = NativeStackScreenProps<RootStackParamList, 'Room'>
const Room : React.FC <RoomScreenProps> = (props)=>{
    
    //props
    const navigation = props.navigation
    //const prevMessages = props.prevMessages
    
    //Global state
        const authContext = useContext(AuthContext)
        const userId = authContext.userId
        const userName = authContext.userName
        const chatContext = useContext(ChatContext)
        const participantId = chatContext.participantId
        const setParticipantId = chatContext.setParticipantId
        const participantName = chatContext.participantName
        const setParticipantName = chatContext.setParticipantName
        const roomId = chatContext.roomId
        const setRoomId = chatContext.setRoomId
        const setMessages = chatContext.setMessages
        const friendContext = useContext(FriendContext)
        const friendId = friendContext.profData.id
        const friendName = friendContext.profData.name

    //local state
      const [status, setStatus] = useState <string>('')
      const [errMsg, setErrMsg] = useState <string>('')
      
    //function definitions
    const getRoomInfo  = async()=>{
        //if the user is comming from the Chats screen, there will be information available about the 
        //chat in the chatcontext. However, if the user is comming from a friend´s profile,
        //there are two posibilities: 1. There is an existing chat between user and friend. In
        //this case the chat is retrived by checkForExistsingRoom(). 2. There is no previous chat.
        //Then a new chat is created by createChat().
        if(participantId === '' && participantName ===''){

             console.log('no info avaliable')
             setStatus('LOADING')
             const checkingResponse = await checkForExisitingRoom()
             console.log(checkingResponse)
             if(checkingResponse.code == 200){
                    console.log('room found')
                    setRoomId(checkingResponse.data[0]._id)
                    setMessages(checkingResponse.data[0].messages)
                    setParticipantId(friendId)
                    setParticipantName(friendName)
                    setStatus('SUCCESS')
                
                }
            if(checkingResponse.code == 400){
                    
                    if(checkingResponse.message === 'not_room_found'){

                        console.log('lets create a room')
                        const roomCreationResponse = await createRoom()

                        if(roomCreationResponse.code == 200){

                            setRoomId(roomCreationResponse.data.insertedId)
                            setParticipantId(friendId)
                            setParticipantName(friendName)
                            setStatus('SUCCESS')
                        }
                        else if(roomCreationResponse.data !== 200){
                            setStatus('ERROR')
                            setErrMsg(roomCreationResponse.message)
                        }
                    }
                    else{
                        setStatus('ERROR')
                        setErrMsg(checkingResponse.message)
                    }
                }

        }
        else{
            console.log('inside room component:')
            setStatus('SUCCESS')
            console.log('in room user', userName)
            console.log('in room participant', participantName)
            console.log('room', roomId)
        }
        
    }
    const checkForExisitingRoom = async()=>{
        try {
            console.log('lets check if there is a room')
            const body = {userId, friendId}
            const response = await fetch(REMOTE_SERVER +'/chat/checkIfRoomExists', {
                method : 'POST',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)
            })
            const parseResponse = await response.json()
            return parseResponse
          
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                return error.message
            }
            
        }
    }
    const createRoom = async()=>{
        try {
            const body = {participants: [{userId, userName}, {friendId,friendName } ]}
            const response = await fetch(REMOTE_SERVER + '/chat/createRoom', {
            method : 'POST',
            headers:{'content-type':'application/json'},
             body : JSON.stringify(body)

            })
            const parseResponse = await response.json()
            console.log(parseResponse)
            return parseResponse
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                return error.message
            }
        }
        
    }
    
      useEffect(()=>{
        socket.emit('join', roomId)
      })
      useEffect(()=>{
        getRoomInfo()
      },[])
    if(status === 'LOADING') {
        return <Status message='...loading'/>
    }
    if(status === 'ERROR'){
        return <Status message={'There was an error. Please try again later'}/>
    }
       
    return(
        <View style={chatStyles.roomMainContainer}>
           
          
            <RoomHeader participantName={participantName} navigation={navigation}/>
             <DisplayMessages socket = {socket}/>
            <SendMessages socket = {socket}/>
        </View>
           
    )
}

export default Room