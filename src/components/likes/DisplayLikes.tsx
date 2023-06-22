import {View, Text, TouchableOpacity} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { REMOTE_SERVER } from '@env'
import { ILike } from './LikeTypes'
import { likeStyles } from './Styles'
interface Props{
  arrayOfLikes : ILike[]
}
const DisplayLikes : React.FC <Props>  = (props)=>{
    //props
    const arrayOfLikes = props.arrayOfLikes
    //local state
    const [showWhoLiked, setShowWhoLiked] = useState<boolean>(false)
   
    return(
        <View style={likeStyles.DisplayLikesConainer}>
            <TouchableOpacity onPress={()=>setShowWhoLiked(true)}>
                <Text style={likeStyles.Text}>{arrayOfLikes.length} likes</Text>
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