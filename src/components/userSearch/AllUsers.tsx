import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native'
import { IUser } from '../friends/FriendTypes';
import { AntDesign } from '@expo/vector-icons';
import { searchStyles } from './Styles';
interface Props{
    users : IUser[]
    charToSearch : string
    setGoToProfile : React.Dispatch<React.SetStateAction<boolean>>
    setProfData : React.Dispatch<React.SetStateAction<IUser>>
}

const AllUsers : React.FC<Props> = (props)=>{
        //local state
        const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
        

       //props
       const users = props.users  
       const charToSearch = props.charToSearch
       const setGoToProfile = props.setGoToProfile
       const setProfData = props.setProfData

       //function definitions
       const filterUsers = ()=>{

            console.log('this is chartosearch from all users',charToSearch)
                let i = 0
            let temp = []
            if(charToSearch === "") return 1

            while(i < users.length){
                const name = users[i].name //joaquin
                let j = 0
                let wasCharFound = true
                //console.log("evaluating: ",name)
           
                while(j < charToSearch.length){
                    if(name[j] !== charToSearch[j]){
                        wasCharFound = false
                        break
                    }

                    j++  
                }
                if(wasCharFound){
                    console.log(wasCharFound)
                    console.log("first letter :", name[j])
                    console.log("charToSearch: ", charToSearch[j])
                    temp.push(users[i])
                    setFilteredUsers(temp)
                }
            
                i++
         }
         console.log(filteredUsers)
       }

        const handleTouchProfile = (user : IUser)=>{
            console.log('go toprofile of: ', user.name)
            console.log('this is the user', user)
            setGoToProfile(true)
            setProfData(user)
        }

       useEffect(()=>{
            filterUsers()
       }, [charToSearch])
    return(
        <View>
            {filteredUsers.map((user, index) =>{
                return(
                    <View>
                        <TouchableOpacity onPress={()=>handleTouchProfile(user)} 
                                           style={searchStyles.user}>
                          
                           {user.picture === "" ?
                                    <AntDesign name="user" size={35} color="black" />
                           
                                    :
                                    <Image source={{ uri: user.picture }} style={searchStyles.userImage} />
                                    
                          }
                            <Text key={index} style={searchStyles.userName}> {user.name} </Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                )
            })} 
            
          
        </View>
           
    )
}

export default AllUsers