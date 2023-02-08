import {REMOTE_SERVER, LOCAL_SERVER} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../Context/AuthContext'
import {View, Text, TextInput, Button} from 'react-native'
import { AuthUser } from '../types/AuthUser'
import { UserContext } from '../Context/UserContext';

type LogInScreenProps = NativeStackScreenProps<RootStackParamList, 'LogIn'>

const LogIn : React.FC<LogInScreenProps>  = (props)=>{

//global state
const authContext = useContext(AuthContext)
const setIsAuthenticated = authContext.setIsAuthenticated
const setToken = authContext.setToken
const setUserId = authContext.setUserId
const setUserName = authContext.setUserName

//local state
const [email, setEmail] = useState<string>('')
const [password, setPassword] = useState<string>('')
const [errorMessage, setErrorMessage] = useState<string>('missing credentials')
const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false)

//props
const navigation = props.navigation
interface IResponseData{
    user : AuthUser
    token : string
}
interface ISuccessFullResponse {
    data : IResponseData
    code : number
    message : string

}
const validateInputs = (uEmail: string, uPassword : string) : boolean =>{
   
    if(uEmail == '' || password == ''){
        setErrorMessage('missing a required field')
        return false
    }
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(uEmail)){
        setErrorMessage('invalid input format')
        return false
    }
    if(password.length > 10){
        setErrorMessage('password cant be longer than 10 characters')
        return false
    }
    return true
}
const loginUser = async(): Promise<ISuccessFullResponse | boolean>=>{

    try {
        //unsuccessful login
        if(!validateInputs(email, password)) {
           setIsLoginFailed(true)
           setTimeout(()=>{setIsLoginFailed(false)}, 2000)
            return false
        }
        const body = {email, password}
        const url = REMOTE_SERVER+'/authentication/loginUser'
        console.log(url)
        const response = await fetch(url,{
        method : 'POST',
        headers:{'content-type':'application/json'},
        body : JSON.stringify(body)

    })
    const loggedUser = await response.json()
    if(loggedUser.code != 200){
        if(loggedUser.code === 400){
            if(loggedUser.message === 'missing_credentials')setErrorMessage('email and password are required fields')
            else if(loggedUser.message === 'invalid_email') setErrorMessage('invalid_email_format')
        }
        else if(loggedUser.code === 401){
            if(loggedUser.message ==='user_not_found') setErrorMessage('The email is incorrect')
            else if(loggedUser.message === 'incorrect_password') setErrorMessage('the password is incorrect')
            
        }
        setEmail('')
        setPassword('')
        setIsLoginFailed(true)
        setTimeout(()=>{setIsLoginFailed(false)}, 2000)
        
        return loggedUser
    }
    //succesfull login
    console.log(loggedUser)
    const id = loggedUser.data.user._id
    const name = loggedUser.data.user.userName
    await AsyncStorage.setItem('token', loggedUser.data.token)
    setToken(loggedUser.data.token)
    setIsAuthenticated(true)
    setUserId(id)
    setUserName(name)
    return loggedUser
    } catch (error) {
        if(error instanceof Error){
            console.log('this is the error',error)
            return false
        }
        
        return false
    }
    
}

    return(
            <View>
                <Text>Hello login</Text>
                
                <TextInput placeholder='email'
                            onChangeText={(value)=>{setEmail(value)}}
                            value = {email}/>
                            
                <TextInput placeholder='password'
                            onChangeText={(value)=>{setPassword(value)}}
                            value = {password} />

                <Button title = 'Send'
                                onPress={loginUser}/>

                <Button title = 'SignUp'
                                onPress={()=>navigation.navigate('SignUp')}/>
                
                { isLoginFailed &&
                    <View>
                        <Text>{errorMessage}</Text>
                    </View>
                }
                 
            </View>
    )
}

export default LogIn

