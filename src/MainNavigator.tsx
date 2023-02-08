import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { RootStackParamList } from './types/rootStackParamList';
import Dashboard from './Screens/Dashboard';
import Profile from './Screens/Profile';
import FriendProfile from './components/friends/FriendProfile';
import UserPost from './Screens/UserPost';
import EditProfile from './Screens/EditProfile';
import UserSearch from './Screens/UserSearch'
import Comments from './components/comments/Comments';
import { ProfilePicContextProvider } from './Context/ProfilePicContext';

const MainNavigator : React.FC = ()=>{

    const Stack = createNativeStackNavigator<RootStackParamList>()
    return(

        <NavigationContainer>
            
            <ProfilePicContextProvider>
            <Stack.Navigator initialRouteName={ 'Dashboard'}> 
                    <Stack.Screen name = 'Dashboard' component={Dashboard}/>
                    <Stack.Screen name = 'Profile' component={Profile}/>
                    <Stack.Screen name = 'EditProfile' component={EditProfile}/>
                    <Stack.Screen name = 'UserPost' component={UserPost}/>    
                    <Stack.Screen name = 'UserSearch' component={UserSearch}/> 
                  

                </Stack.Navigator> 
            </ProfilePicContextProvider>
                
           
            

    </NavigationContainer>
    )
}

export default MainNavigator