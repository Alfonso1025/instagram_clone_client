import React, { useState } from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { footStyles } from './styles';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ProfilePicture from '../Profile/ProfilePicture';




interface Props{
    navigation : any
}


const  Footer: React.FC <Props>= (props)=> {

    //props
    const navigation = props.navigation
   
  return (
   <View style = {footStyles.mainContainer}>
       <View style={footStyles.iconsWrapper}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')}}>
                <Entypo name="home" size={30} color="black" />
            </TouchableOpacity >

            <TouchableOpacity onPress={()=>{navigation.navigate('UserSearch')}}>
                <EvilIcons name="search" size={30} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{navigation.navigate('UserPost')}}>
                <FontAwesome name="plus-square-o" size={30} color="black" />
            </TouchableOpacity> 
 
            <TouchableOpacity onPress={()=>{navigation.navigate('Profile')}}>
                <ProfilePicture size='small' showFriendPic={false}/> 
            </TouchableOpacity> 
            
       </View>
        
    </View>
  );
}
export default Footer