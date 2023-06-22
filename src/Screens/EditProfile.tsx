import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { useState, useContext } from 'react';
import { ProfilePicContext } from '../Context/ProfilePicContext'
import { AuthContext } from '../Context/AuthContext';
import {View, Text, Button, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

type EditScreenProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>
const EditProfile : React.FC <EditScreenProps>= (props)=>{
    
       //props
       const navigation = props.navigation
       //global state
       const profilePicContext = useContext(ProfilePicContext)
       const setProfilePic = profilePicContext.setProfilePic
       const profilePic = profilePicContext.profilePic

       const authcontex = useContext(AuthContext)
       const token = authcontex.token
       //local state
       const [picture, setPicture] = useState<string>('')
       const [showErrorMess, setShowErrMess] = useState<boolean>(false)
       const errorMessage = 'Could not change image. Try again'

        const pickImage = async ():Promise<string|boolean> => {
          
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.canceled) {
            console.log('this is result', result)
           const uri =  result.assets[0].uri
            setPicture(uri)
           
            
            
          }
          return false
        };

        const sendPictureToServer = async () => {

           try {
              console.log('sending picture to server: ', REMOTE_SERVER)
              if(picture == '') return false
              const response = await FileSystem.uploadAsync(REMOTE_SERVER+'/dashboard/chooseProfilePic' ,picture,{
                    headers : {token },
                    fieldName: 'file',
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  
                  })
      
            const parseResponse = JSON.parse(response.body)
      
             
            if(parseResponse.code != 200){
                setShowErrMess(true)
                return false
             }
             //if response is succesfull store profile pic in context
            setProfilePic(picture)
            
       } catch (error) {
        console.log(error)
       }
          
      
        

            
        }
    return(
            <View>
                <Button title = 'select' onPress={pickImage}/>
                <Button title='send' onPress={sendPictureToServer}/>
                { showErrorMess &&
                   <View>
                        <Text>{errorMessage}</Text>
                   </View>
                }
            </View>
            
    )
}

export default EditProfile