import { ProfilePicContext } from '../Context/ProfilePicContext'
import {View, Text, Button,Image} from 'react-native'
import { useContext } from 'react'

interface Props{
    status : string
}
const ProfilePicture : React.FC <Props> = (props)=>{
    //Global state
     const profilePicContext = useContext(ProfilePicContext)
     const profilePic = profilePicContext.profilePic   

    //props
    const status = props.status
 return(
     <View>
         
          {profilePic && <Image source={{ uri: profilePic }} style={{ width: 50, height: 50 }} />} 
    </View>
  )
}

export default ProfilePicture