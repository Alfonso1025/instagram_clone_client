

/* 
This component shows the logged user profile picture as a general rule. However,
when a friend profile is visited, the picture of such friend is displayed instead. 
To decide which picture to show, the component receives boolean showFriendProfile, 
which is true in case the component is rendered in the header of the FriendProfileScreen */



import { ProfilePicContext } from '../../Context/ProfilePicContext'
import { FriendContext } from '../../Context/FriendContext'
import {View, Text, Button,Image} from 'react-native'
import { useContext } from 'react'
import { profPicStyles } from './ProfPicStyles'
import { AntDesign } from '@expo/vector-icons';

interface Props{
  size : string
  showFriendPic : boolean
}

const ProfilePicture : React.FC<Props>  = (props)=>{
    //props
     const size = props.size
     const showFriendPic = props.showFriendPic
    
    //Global state
    const friendContext = useContext(FriendContext)
    const friendPicture = friendContext.profData.picture
     const profilePicContext = useContext(ProfilePicContext)
     const profilePic = profilePicContext.profilePic   

   
     let pic =''
     if(showFriendPic){
        
        //pic = friendPicture
        pic = friendPicture
     }
     else if(!showFriendPic){
      
      pic = profilePic
     }
     let imageStyle;
     switch (size) {
       case 'small':
         imageStyle = profPicStyles.smallImage;
         
         break;
       case 'large':
         imageStyle = profPicStyles.largeImage;
         
         break;
       
     }
     
 return(
  
    <View>
      {pic === '' ?
                 <AntDesign name="user" size={35} color="black" />
                  :
                  
                  <Image source={{ uri: pic }} style={imageStyle}  />
      }
    </View>

  
  )
}

export default ProfilePicture