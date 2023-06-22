import { REMOTE_SERVER } from '@env';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Root : React.FC = ()=> {

const authContext = useContext(AuthContext)
const isAuthenticated = authContext.isAuthenticated
const setIsAuthenticated = authContext.setIsAuthenticated
const setToken = authContext.setToken
const setUserId = authContext.setUserId
const setUserName = authContext.setUserName

const verifyToken = async(): Promise<boolean>=>{
    console.log('this is the server',REMOTE_SERVER)

    try {
        
        const token = await AsyncStorage.getItem('token')
       /* await AsyncStorage.removeItem('token') 
        setIsAuthenticated(false)  */ 
        if(token != null){
            console.log('there is a token', token)
            const checkTokenOnServer = await fetch(REMOTE_SERVER+'/dashboard/verifyToken', {
                headers:{token}
            })
            let result = await checkTokenOnServer.json()
            //result.data is a boolean
            if(result.data){
                //user is authenticated but left the app and is back
                //the user id, stored in context, is lost. Request the id to server
                const requestUserInfo = await fetch(REMOTE_SERVER + '/dashboard/getUser',{
                    headers: {token}
                })
                result = await requestUserInfo.json()
                if(result.code === 200){
                    console.log(result.data)
                    setUserId(result.data._id)
                    setUserName(result.data.userName)
                    setIsAuthenticated(true)
                    setToken(token)
                }
                
                return true
            }
            else if(!result.data){
                await AsyncStorage.removeItem('token')
                console.log('token removed')
                return false
            }
        }
       
        console.log('there is no token in local storage')
        return false
        
        
    } catch (error) {
        return false
    }
}
useEffect(()=>{
    verifyToken()
})
  return isAuthenticated ? <MainNavigator/> : <AuthNavigator/>
}

export default Root