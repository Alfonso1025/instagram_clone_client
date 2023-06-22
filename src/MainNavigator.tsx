import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { RootStackParamList } from './types/rootStackParamList';
import Dashboard from './Screens/Dashboard';
import Profile from './Screens/Profile';
import UserPost from './Screens/UserPost';
import EditProfile from './Screens/EditProfile';
import UserSearch from './Screens/UserSearch'
import { ProfilePicContextProvider } from './Context/ProfilePicContext';
import { FriendContextProvider } from './Context/FriendContext';
import { ChatContextProvider } from './Context/ChatContext';
import { PostContextProvider } from './Context/PostContext';
import FriendProfileScreen from './Screens/FriendProfileScreen';
import Chats from './Screens/Chats';
import Room from './Screens/Room'
import Comments from './Screens/Comments';

const MainNavigator : React.FC = ()=>{

    const Stack = createNativeStackNavigator<RootStackParamList>()
    return(

        <NavigationContainer>
            
            <ProfilePicContextProvider>
            <FriendContextProvider>
            <ChatContextProvider>
            <PostContextProvider>
              
              <Stack.Navigator initialRouteName={ 'Dashboard'}> 
                    <Stack.Screen name = 'Dashboard' component={Dashboard} options={{
                    headerShown: false, 
                     }}/>
                    <Stack.Screen name = 'Profile' component={Profile}/>
                    <Stack.Screen name = 'EditProfile' component={EditProfile}/>
                    <Stack.Screen name = 'UserPost' component={UserPost}/> 
                    <Stack.Screen name = 'Comments' component={Comments}/> 
                    <Stack.Screen name = 'UserSearch' component={UserSearch}/> 
                    <Stack.Screen name = 'FriendProfileScreen' component={FriendProfileScreen}/> 
                    <Stack.Screen name = 'Chats' component={Chats}/>   
                    <Stack.Screen name = 'Room' component={Room} options={{headerShown: false,}}/>
                </Stack.Navigator>
            </PostContextProvider>  
            </ChatContextProvider>
            </FriendContextProvider> 
            </ProfilePicContextProvider>
                
           
            

    </NavigationContainer>
    )
}

export default MainNavigator