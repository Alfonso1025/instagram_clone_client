import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext } from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native'
import { FriendContext } from '../Context/FriendContext';
import { ChatContext } from '../Context/ChatContext';
import ProfilePosts from '../components/Profile/ProfilePosts';
import Header from '../components/Profile/Header';
import Footer from '../components/Footer/Footer';
import { friendProfStyles } from '../components/friends/Styles';


type FriendProfilecreenProps = NativeStackScreenProps<RootStackParamList, 'FriendProfileScreen'>

const FriendProfileScreen : React.FC <FriendProfilecreenProps> = (props)=>{
    
    //props
    const navigation = props.navigation    
    
    //global state
    const friendContext = useContext(FriendContext)
    const id = friendContext.profData.id
    const name = friendContext.profData.name
    const picture = friendContext.profData.picture
    const chatContext = useContext(ChatContext)
    const setParticipantId = chatContext.setParticipantId
    const setParticipantName = chatContext.setParticipantName
    const setRoomId = chatContext.setRoomId
   
    //function definitions
    const goToMessages = ()=>{
            //each time the user leaves the room, the room info is cleared. Otherwise, when user
            //intends to start a new chat with a new participant, the old room info remains
            //in the global state
            setParticipantId('')
            setParticipantName('')
            setRoomId('')
        navigation.navigate('Room')
    }
    return(
            <View style={friendProfStyles.mainContainer}>
              <Header navigation={navigation} name={name} showFriendPic={true}/>  
               <TouchableOpacity onPress={goToMessages} style={friendProfStyles.messageButton}>
                   <Text>Message</Text>
               </TouchableOpacity>
                <ProfilePosts id = {id} navigation = {navigation}/>  
                <Footer navigation={navigation}/>  
            </View>
    )
}

export default FriendProfileScreen