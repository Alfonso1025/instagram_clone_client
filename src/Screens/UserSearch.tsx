import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext,useEffect } from 'react';
import {View, Text, Button, Image} from 'react-native'
import AllUsers from '../components/userSearch/AllUsers'
import Search from '../components/userSearch/Search';
import { RootStackParamList } from '../types/rootStackParamList'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { IUser } from '../components/friends/FriendTypes';
import { FriendContext } from '../Context/FriendContext';
import { searchStyles } from '../components/userSearch/Styles';
type userSearchScreenProps = NativeStackScreenProps<RootStackParamList, 'UserSearch'>

const UserSearch : React.FC<userSearchScreenProps> = (props)=>{
       //props
       const navigation = props.navigation
       //global state
        const friendContext = useContext(FriendContext)
        const setProfData = friendContext.setProfData
       //local state
       const [users, setUsers] = useState<IUser[]>([])
       const [charToSearch, setCharToSearch] = useState<string>('/')
       const [goToProfile, setGoToProfile] =  useState<boolean>(false)
       
       //function definitions
       const getAllUsers =  async(): Promise<boolean>=>{
        try {
            console.log('inside function get all users')
           const response = await fetch(REMOTE_SERVER + '/userSearch/allUsers') 
           const parseResponse = await response.json()
           console.log('this is response from getallusers',parseResponse)
           setUsers(parseResponse.data)
        } catch (error) {
            console.log('this is the error',error)
        }
        return true
       }
      const navigateToProfile = ()=>{
        console.log('go to profile is: ',goToProfile)
        if(goToProfile){
            navigation.navigate('FriendProfileScreen')
        }
        setGoToProfile(false)
      }
     useEffect(()=>{
        getAllUsers()
     }, [])   

    useEffect(()=>{
        navigateToProfile()
    },[goToProfile]) 
    return(
        
        <View style = {searchStyles.mainContainer}>
            
            
            <Search charToSearch={charToSearch} setCharToSearch={setCharToSearch}/>
            <AllUsers users={users} 
                             charToSearch = {charToSearch} 
                             setGoToProfile={setGoToProfile} 
                             setProfData={setProfData}/> 
        </View>
           
    )
}

export default UserSearch