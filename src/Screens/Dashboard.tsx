import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { AuthContext } from '../Context/AuthContext'
import { ProfilePicContext } from '../Context/ProfilePicContext'
import ProfilePicture from '../components/ProfilePicture'
import FriendsPosts from '../components/friends/FriendsPosts'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'



type DashScreenProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>
 
const Dashboard : React.FC  <DashScreenProps>= (props)=>{
   
    
    //interfaces
    interface IPost{
        contentString : string
        urls : string[]
    }
    //global state
    const authContext = useContext(AuthContext)
    const setIsAuthenticated = authContext.setIsAuthenticated
    const token = authContext.token
    console.log('token in dashboard', token)
    const id = authContext.userId
    console.log('id in dashboard', id)
    const userName = authContext.userName
    console.log('name in dashboard', userName)
    

    const profilePicContext = useContext(ProfilePicContext)
    const setProfilePic = profilePicContext.setProfilePic

    //local state
    const [arrayOfPosts, setArrayOfPosts] = useState<IPost[]>([])
    const [status, setStatus] = useState<string>('')
    const [errMsg, setErrMsg] = useState<string>("")
    
    //props
    const navigation = props.navigation

    //function definitions
    const getProfilePicture = async():Promise<boolean>=>{
        setStatus('LOADING')
        try {
            const response = await fetch(REMOTE_SERVER+'/dashboard/downloadProfilePicture', {
                headers : {token}

            })
            const parseResponse = await response.json()
            if(parseResponse.data){
                setProfilePic(parseResponse.data)
            }
            
        } catch (error) {
            console.log(error)
            if(error instanceof Error){
                console.log('this is the error',error)
                return false
            }
        }
        return true 
    }

    


    const logOut = async(): Promise<boolean>=>{
        console.log('log out clicked')
        await AsyncStorage.removeItem('token')
        setIsAuthenticated(false)
        return true
    }

    
     useEffect(()=>{
        getProfilePicture()
    }, [])  
    
      

    return(
            <View>

               
                <Button title = 'Log Out'
                        onPress = {logOut}/>
                  <Button title = 'Profile'
                        onPress = { ()=> navigation.navigate('Profile') }/>
                <Button title = 'userSearch'
                        onPress = { ()=> navigation.navigate('UserSearch') }/>
                 
                 <ProfilePicture status= {status}/>
                 <FriendsPosts id = {id}/>
               
            </View>
    )
}

export default Dashboard