import React, { useState } from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { headStyles } from './headStyles';

const instagramImage = require('./assets/instagram2.png')

interface Props{
    navigation : any
}


const  Header: React.FC <Props>= (props)=> {

    //props
    const navigation = props.navigation
    

    

  return (
   <View style = {headStyles.mainContainer}>

         <View>
              <Image source={instagramImage} style={headStyles.image}/>
        </View> 
        <TouchableOpacity onPress={()=>{navigation.navigate('Chats')}}>
              <SimpleLineIcons name="paper-plane" size={25} color="black" />
         </TouchableOpacity>
      
   </View>
  );
}
export default Header

