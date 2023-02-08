import {View, Text, Button,Image, FlatList} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { REMOTE_SERVER } from '@env'
import GiveLike from './GiveLike'
import DisplayLikes from './DisplayLikes'
import { ILike } from './LikeTypes'
interface Props{
    id : string
    collection : string
    arrayOfLikes : ILike[]
    
}
const Like : React.FC <Props>  = (props)=>{
    //props
    const id = props.id
    const collection = props.collection
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const arrayOfLikes = props.arrayOfLikes
    console.log(arrayOfLikes)
    return(
        <View>
            <GiveLike arrayOfLikes={arrayOfLikes} id ={id} collection = {collection} setIsLiked = {setIsLiked} isLiked={isLiked} />
            <DisplayLikes arrayOfLikes={arrayOfLikes}/> 
        </View>
    )
}

export default Like