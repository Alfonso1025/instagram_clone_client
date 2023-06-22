import { createContext, useState } from "react";
import { IUser } from "../components/friends/FriendTypes";


type FriendContextProviderProps = {
    children: React.ReactNode
}

type FriendContextType= {
    
    profData : IUser
    setProfData : React.Dispatch<React.SetStateAction<IUser>>
    
}

export const FriendContext = createContext({} as FriendContextType)
export const FriendContextProvider = ({children}: FriendContextProviderProps)=>{
   
    const [profData, setProfData] = useState<IUser>({id:'', name: '',picture:''})
    
    return(
        <FriendContext.Provider  value={{profData, setProfData}}>
        {children}
        </FriendContext.Provider>
    )
}