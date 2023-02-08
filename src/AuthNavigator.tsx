import { AuthContextProvider } from './Context/AuthContext';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { RootStackParamList } from './types/rootStackParamList';
import LogIn from './Screens/LogIn';
import SignUp from './Screens/SignUp';
const AuthNavigator : React.FC = ()=>{

    const Stack = createNativeStackNavigator<RootStackParamList>()
    return(
        <NavigationContainer>
            
                <Stack.Navigator initialRouteName={ 'LogIn'}> 
                    <Stack.Screen name= 'LogIn' component={LogIn}/>
                    <Stack.Screen name = 'SignUp' component={SignUp}/>      
                </Stack.Navigator>
           
          
    </NavigationContainer>
    )
}

export default AuthNavigator