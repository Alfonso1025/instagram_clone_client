import { REMOTE_SERVER, LOCAL_SERVER } from '@env';
import { useState, useContext, useEffect } from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native'
import { IUser } from '../../Screens/UserSearch';
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
                        <TouchableOpacity onPress={()=>handleTouchProfile(user)}>
                           <Text key={index}>{user.name}</Text>
                           <Image source={{ uri: user.picture }} style={{ width: 50, height: 50 }} />
                        </TouchableOpacity>
                        
                    </View>
                    
                )
            })} 
            
          
        </View>
           
    )
}

export default AllUsers