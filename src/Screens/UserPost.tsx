import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker/build/ImagePicker.types';


type PostScreenProps = NativeStackScreenProps<RootStackParamList, 'UserPost'>


const  UserPost: React.FC <PostScreenProps>= (props)=> {

    //props
    const navigation = props.navigation
    const [images, setImages] = useState<ImagePickerAsset[]>([]);

    const pickImage = async () => {
      console.log('multiple')
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        allowsMultipleSelection : true,
        selectionLimit : 5,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImages(result.assets);
      }
    };

  return (
   <View>
       
            <Button title = 'select' onPress={pickImage}/>
          
    
   </View>
  );
}
export default UserPost

