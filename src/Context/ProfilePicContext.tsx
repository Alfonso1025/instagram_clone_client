import { createContext, useState } from "react";

type ProfilePicContextProviderProps = {
    children: React.ReactNode

}


type ProfilePicContextType= {
    profilePic : string
    setProfilePic : React.Dispatch<React.SetStateAction<string>>
    
}

export const ProfilePicContext = createContext({} as ProfilePicContextType)

export const ProfilePicContextProvider = ({children}: ProfilePicContextProviderProps)=>{
   
    const [profilePic, setProfilePic] = useState<string>('')
   

    return(
        <ProfilePicContext.Provider  value={{profilePic, setProfilePic}}>
        {children}
        </ProfilePicContext.Provider>
    )
}