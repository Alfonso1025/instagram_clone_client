import { createContext, useState } from "react";
import { AuthUser } from "../types/AuthUser";


type AuthContextProviderProps = {
    children: React.ReactNode
}


type AuthContextType= {
    
    isAuthenticated : boolean
    setIsAuthenticated : React.Dispatch<React.SetStateAction<boolean>>
    token : string
    setToken : React.Dispatch<React.SetStateAction<string>>
    userId : string
    setUserId : React.Dispatch<React.SetStateAction<string>>
    userName : string
    setUserName : React.Dispatch<React.SetStateAction<string>>
    
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({children}: AuthContextProviderProps)=>{
   
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    
    return(
        <AuthContext.Provider  value={{isAuthenticated, setIsAuthenticated,token, setToken, userId,setUserId,userName,setUserName}}>
        {children}
        </AuthContext.Provider>
    )
}