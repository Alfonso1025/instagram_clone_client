import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext,useEffect } from 'react';
import {View, Text, Button, Image} from 'react-native'
import AllUsers from '../components/userSearch/AllUsers'
import Search from '../components/userSearch/Search';
import { RootStackParamList } from '../types/rootStackParamList'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import FriendProfile from '../components/friends/FriendProfile';

type userSearchScreenProps = NativeStackScreenProps<RootStackParamList, 'UserSearch'>
export interface IUser{
    id : string
    name : string
    picture : string
}
const Profile : React.FC = ()=>{
       
       //local state
       const [users, setUsers] = useState<IUser[]>([])
       const [charToSearch, setCharToSearch] = useState<string>('/')
       const [goToProfile, setGoToProfile] =  useState<boolean>(false)
       const [profData, setProfData] = useState<IUser>({id : "", name: "", picture: "" })
       //function definitions
       const getAllUsers =  async(): Promise<boolean>=>{
        try {
            console.log('inside function')
           const response = await fetch(REMOTE_SERVER + '/userSearch/allUsers') 
           const parseResponse = await response.json()
           console.log(parseResponse)
           setUsers(parseResponse.data)
        } catch (error) {
            console.log(error)
        }
        return true
       }
      
     useEffect(()=>{
        getAllUsers()
     }, [])   
        
    return(
        
        <View>
            {
                !goToProfile ? 
                <View>
                   <Search charToSearch={charToSearch} setCharToSearch={setCharToSearch}/>
                   <AllUsers users={users} 
                             charToSearch = {charToSearch} 
                             setGoToProfile={setGoToProfile} 
                             setProfData={setProfData}/>
                </View>
                :
                <FriendProfile 
                              
                              profData = {profData}
                              setGoToProfile={setGoToProfile} />
            }
           
          
          
           
        </View>
           
    )
}

export default Profile