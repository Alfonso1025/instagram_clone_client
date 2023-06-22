import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext, useEffect, useState } from 'react'
import {View, Text, Button,Image, FlatList} from 'react-native'
import { AuthContext } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'
import { ProfilePicContext } from '../Context/ProfilePicContext'
import ProfilePicture from '../components/Profile/ProfilePicture'
import FriendsPosts from '../components/friends/FriendsPosts'
import { LOCAL_SERVER, REMOTE_SERVER } from '@env'
import Header from '../components/Dashboard/Header'
import Footer from '../components/Footer/Footer'
import { dashStyles } from '../components/Dashboard/styles'
import { SafeAreaView } from 'react-native-safe-area-context';



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
    //const token = authContext.token
    const id = authContext.userId
    const userName = authContext.userName
    const chatContext = useContext(ChatContext)
    const profilePicContext = useContext(ProfilePicContext)
    const setProfilePic = profilePicContext.setProfilePic
   const getToken = async()=>{
    return await AsyncStorage.getItem('token')
   }
   
   
    //local state
    const [arrayOfPosts, setArrayOfPosts] = useState<IPost[]>([])
    const [errMsg, setErrMsg] = useState<string>("")
    
    //props
    const navigation = props.navigation

    //function definitions
    const getProfilePicture = async():Promise<boolean>=>{
        
        try { 
            const token = await  getToken()
            console.log('this is the token', token)
            if(typeof token === "string"){
                
                const response = await fetch(REMOTE_SERVER+'/dashboard/downloadProfilePicture', {
                headers : {token}

                })
                const parseResponse = await response.json()
                console.log('response from get profile pic',parseResponse)
                if(parseResponse.data){
                
                    setProfilePic(parseResponse.data)
                }
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
        setTimeout(()=>{
            getProfilePicture()
        }, 5000)
        
    }, [])  
    
      

    return(
            <View style = {dashStyles.mainContainer}>
              
                <Header navigation= {navigation}/>
                <FriendsPosts id = {id} navigation={navigation}/>    
                 <Footer navigation={navigation}/>  
                   
            </View>
    ) 
}

export default Dashboard