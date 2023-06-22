import React, { useState } from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {  useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { SimpleLineIcons } from '@expo/vector-icons';
import { headStyles } from './HeadStyles';
import ProfilePicture from './ProfilePicture';



interface Props{
    navigation : any
    name : string
    showFriendPic: boolean
}


const  Header: React.FC <Props>= (props)=> {

    //props
    const navigation = props.navigation
    const userName = props.name
    const showFriendPic = props.showFriendPic
    
  return (
   <View style = {headStyles.mainContainer}>
    
        <View style={headStyles.fisrtRow}>
            <View style={headStyles.firstRowPic}>
                <ProfilePicture size = {'large'} showFriendPic={showFriendPic}/>  
                <Text style={headStyles.firstRowPicText}>{userName}</Text>
            </View>
            <View style={headStyles.firstRowInfo}>
                <View style={headStyles.firstRowInfoItem}>
                     <Text style={headStyles.firstRowItemTextNumber}>0</Text>
                    <Text style={headStyles.firstRowItemTextString}>Post</Text>
                   
                </View>
                <View style={headStyles.firstRowInfoItem}>
                    <Text style={headStyles.firstRowItemTextNumber}>0</Text>
                    <Text style={headStyles.firstRowItemTextString}>Followers</Text>
                    
                </View>
                <View style={headStyles.firstRowInfoItem}>
                    <Text style={headStyles.firstRowItemTextNumber}>0</Text>
                    <Text style={headStyles.firstRowItemTextString}>Following</Text>
                    
                </View>
             </View>
        </View> 
        <View>
            <TouchableOpacity 
                          onPress={()=> navigation.navigate('EditProfile')}
                          style={headStyles.secondRowButton}>
                <Text style={headStyles.secondRowButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
        
      
   </View>
  );
}
export default Header

