import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext'
import {View, Text, Button, Image} from 'react-native'
import ProfilePicture from './EditProfile'
import ProfilePosts from '../components/Profile/ProfilePosts';
import Header from '../components/Profile/Header';
import Footer from '../components/Footer/Footer';
import { ProfileStyles } from '../components/Profile/Styles';

type ProfilecreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>

const Profile : React.FC <ProfilecreenProps> = (props)=>{
    
    //props
    const navigation = props.navigation
    
    //Global state
        const authContext = useContext(AuthContext)
        const id = authContext.userId
        const name = authContext.userName
        
     //local state
      
        
        
    return(
        <View style={ProfileStyles.mainContainer}>
         
            <Header navigation={navigation} name={name}/>
            <ProfilePosts id = {id} navigation= {navigation}/>
            <Footer navigation={navigation}/>
           
        </View>
           
    )
}

export default Profile