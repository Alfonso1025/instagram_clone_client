import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/rootStackParamList'
import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext'
import {View, Text, Button, Image} from 'react-native'
import { IChat } from './ChatTypes';

interface Props{
   allChats : IChat[]
   status :string
   errMsg : string
}

const ActiveChats : React.FC <Props> = (props)=>{
    
    //props
    const allChats = props.allChats
    const status = props.status
    const errMsg = props.errMsg
    
    //Global state
        const authContext = useContext(AuthContext)
        const id = authContext.userId
        
       //local state
      

      // function definitions
       
    if(status === 'LOADING') {
        return <Text>...LOADING</Text>
    }
    if(status === 'ERROR'){
        return <Text>{errMsg}</Text>
    }
        
    return(
        <View>
            
        </View>
           
    )
}

export default ActiveChats