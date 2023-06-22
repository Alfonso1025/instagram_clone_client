import {View, Text, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { REMOTE_SERVER } from '@env'
import Post from '../Post/Post'
import { ILike } from './LikeTypes'
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { likeStyles } from './Styles'
interface Props{
    id : string
    collection : string
    isLiked : boolean
    arrayOfLikes : ILike[]
    setIsLiked : React.Dispatch<React.SetStateAction<boolean>>

}

const GiveLike : React.FC <Props>  = (props)=>{

    //props
    const id = props.id
    const collection = props.collection
    const isLiked = props.isLiked
    const setIsLiked =props.setIsLiked
    const arrayOfLikes =props.arrayOfLikes
    //global state
    const authContext = useContext(AuthContext)
    const userId = authContext.userId
    const userName = authContext.userName
    //local state
  
   //function definitions
    const findIfIsLiked = ()=>{
        try {
          for(let i = 0; i < arrayOfLikes.length; i++ )  {
            if(userId === arrayOfLikes[i].likedBy){
                setIsLiked(true)
                return 0
            }
          }
        } catch (error) {
            console.log(error)
        }
    }
    const addLike = async()=>{
        try {
            const body = {id, collection, userId, userName}
            const response = await fetch(REMOTE_SERVER + '/like/addLike', {
                method : 'PUT',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)
           })
           const parseResponse = await response.json()
           console.log(parseResponse)
           if(parseResponse.status === 200){
            setIsLiked(true)
           }
        } catch (error) {
            console.log(error)
        }
    }
    const unLike = async()=>{
        try {
            const body = {id, collection}
            const response = await fetch(REMOTE_SERVER + '/like/addLike', {
                method : 'PUT',
                headers:{'content-type':'application/json'},
                body : JSON.stringify(body)
           })
           const parseResponse = await response.json()
           if(parseResponse.status === 200){
            setIsLiked(false)
           }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        findIfIsLiked()
    }, [])
    return(
        <>
            { isLiked ?
                <TouchableOpacity   onPress={addLike}>
                     <Octicons name="heart-fill" size={24} color="red" />
                </TouchableOpacity>

                :

                <TouchableOpacity onPress={addLike}>
                     <AntDesign name="hearto" size={24} color="black" />
                </TouchableOpacity>

            }
        </>
            
            
              
        
    )
}

export default GiveLike