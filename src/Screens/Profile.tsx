import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext'
import {View, Text, Button, Image} from 'react-native'
import ProfilePicture from './EditProfile'
import ProfilePosts from '../components/ProfilePosts';

type ProfilecreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile : React.FC <ProfilecreenProps> = (props)=>{
    
    //props
    const navigation = props.navigation
    
    //Global state
        const authContext = useContext(AuthContext)
        const id = authContext.userId
        
       //local state
      
        
        
    return(
        <View>
            <ProfilePosts id = {id}/>
            <Button title='edit profile'
                    onPress={()=> navigation.navigate('EditProfile')} 
                    />
        </View>
           
    )
}

export default Profile