import { LOCAL_SERVER } from '@env';
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

const verifyToken = async(): Promise<string>=>{
    
    try {
        const token = await AsyncStorage.getItem('token')
        if(token != null){
            const checkTokenOnServer = await fetch(LOCAL_SERVER+'/dashboard/verifyToken', {
                headers:{token}
            })
            const result = await checkTokenOnServer.json()
            if(result.data){
                setIsAuthenticated(true)
                setToken(token)
                return 'there is a token'
            }
            else if(!result.data){
                await AsyncStorage.removeItem('token')
                return 'token removed'
            }
        }
        console.log('there is no token in local storage')
        return 'no token'
        
        
    } catch (error) {
        return 'an error ocurred'
    }
}
useEffect(()=>{
    verifyToken()
})
  return isAuthenticated ? <MainNavigator/> : <AuthNavigator/>
}

export default Root