import { createContext, useState } from "react";
import { AuthUser } from "../types/AuthUser";

type UserContextProviderProps = {
    children: React.ReactNode
}

type UserContextType= {
    
    authUser : AuthUser
    setAuthUser : React.Dispatch<React.SetStateAction<AuthUser>>
    
}

export const UserContext = createContext({} as UserContextType)
export const UserContextProvider = ({children}: UserContextProviderProps)=>{
   
    const [authUser, setAuthUser] = useState<AuthUser>({userId:'', userName:''})
    
    return(
        <UserContext.Provider  value={{authUser, setAuthUser}}>
        {children}
        </UserContext.Provider>
    )
}