import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/rootStackParamList'
import { useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../Context/AuthContext'
import {View, Text, TextInput, Button} from 'react-native'
import { AuthUser } from '../types/AuthUser'

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>

const SignUp : React.FC <SignUpScreenProps>= (props)=>{
    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('missing credentials')
    const [isSignUpFailed, setIsSignUpFailed] = useState<boolean>(false)
    const [isSignUpSuccessful, setIsSignUpSuccesfull] = useState<boolean>(false)
    //props
    const navigation = props.navigation
    interface IResponseData{
        acknowledged : boolean
        insertedId : string
    }
    interface ISuccessFullResponse {
        data : IResponseData
        code : number
        message : string
    
    }
    const validateInputs = (uName: string, uEmail: string, uPassword : string) : boolean =>{
       
        if(uName =='' || uEmail == '' || password == ''){
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
    const registerUser = async(): Promise<ISuccessFullResponse | boolean>=>{
    
        try {
            if(!validateInputs(userName, email, password)) {
               setIsSignUpFailed(true)
               setTimeout(()=>{setIsSignUpFailed(false)}, 2000)
                return false
            }
            const body = {userName,email, password}
            const response = await fetch('54.162.138.235:3000/authentication/registerUser',{
            method : 'POST',
            headers:{'content-type':'application/json'},
            body : JSON.stringify(body)
    
        })
        const newUser = await response.json()
        
            if(newUser.code === 400){
                if(newUser.message === 'missing_credentials')setErrorMessage('email and password are required fields')
                else if(newUser.message === 'invalid_email') setErrorMessage('invalid_email_format')
                else if(newUser.message === 'existing_user') setErrorMessage('already have an account. Log in')
                
                setUserName('')
                setEmail('')
                setPassword('')
                setIsSignUpFailed(true)
                setTimeout(()=>{setIsSignUpFailed(false)}, 2000)
                
                return false
            }
        setIsSignUpSuccesfull(true)
        setTimeout(()=>{navigation.navigate('LogIn')}, 3000)
        return newUser

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
                <Text>Hello SignUp</Text>

                <TextInput placeholder='name...'
                            maxLength={20}
                            onChangeText={(value)=>{setUserName(value)}}
                            value = {userName}/>
                            
                <TextInput placeholder='email'
                            onChangeText={(value)=>{setEmail(value)}}
                            value = {email}/>
                            
                <TextInput placeholder='password'
                            onChangeText={(value)=>{setPassword(value)}}
                            value = {password} />

                <Button title = 'Send'
                                onPress={registerUser}/>

                <Button title = 'Log in'
                                onPress={()=>navigation.navigate('LogIn')}/>
                
                { isSignUpFailed &&
                    <View>
                        <Text>{errorMessage}</Text>
                    </View>
                }
                {
                    isSignUpSuccessful &&
                    <View>
                        <Text>Your account was created succesfully!</Text>
                    </View>
                }

            </View>
    )
}

export default SignUp