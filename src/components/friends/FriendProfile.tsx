import {View, Text, Image} from 'react-native'
import { IUser } from '../../Screens/UserSearch';
import ProfilePosts from '../ProfilePosts';


interface Props{
    profData : IUser
    setGoToProfile : React.Dispatch<React.SetStateAction<boolean>>
}
const FriendProfile : React.FC <Props>= (props)=>{
    //props
    const setGoToProfile = props.setGoToProfile
    const id = props.profData.id
    const name = props.profData.name
    const picture = props.profData.picture
    
    return(
            <View>
                <Text>{name}</Text>
                {picture && <Image source={{ uri: picture }} style={{ width: 50, height: 50 }} />} 
                <ProfilePosts id = {id}/>

            </View>
    )
}

export default FriendProfile