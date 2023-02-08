import {View, Text, TouchableOpacity} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { REMOTE_SERVER } from '@env'
import { ILike } from './LikeTypes'
interface Props{
  arrayOfLikes : ILike[]
}
const DisplayLikes : React.FC <Props>  = (props)=>{
    //props
    const arrayOfLikes = props.arrayOfLikes
    //local state
    const [showWhoLiked, setShowWhoLiked] = useState<boolean>(false)
    if(arrayOfLikes.length == 0){
        return (
            <Text>No one has liked</Text>
        )
    }
    return(
        <View>
            <TouchableOpacity onPress={()=>setShowWhoLiked(true)}>
                <Text>Liked by {arrayOfLikes.length}</Text>
            </TouchableOpacity>
            
            { showWhoLiked &&
                arrayOfLikes.map((like, index)=>{
                    return(
                        <Text>{like.userName}</Text>
                    )
                })
            }
            
        </View>
    )
}

export default DisplayLikes