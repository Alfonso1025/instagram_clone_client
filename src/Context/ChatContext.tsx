import { createContext, useState } from "react";
import { IMessage } from "../components/Chat/ChatTypes";
import { IUser } from "../components/friends/FriendTypes";


type ChatContextProviderProps = {
    children: React.ReactNode
}

type ChatContextType= {

    participantId : string
    setParticipantId :  React.Dispatch<React.SetStateAction<string>>
    participantName : string
    setParticipantName :  React.Dispatch<React.SetStateAction<string>>
    roomId : string
    setRoomId :  React.Dispatch<React.SetStateAction<string>>
    messages : IMessage[]
    setMessages :  React.Dispatch<React.SetStateAction<IMessage[]>>
    newMessages : IMessage[]
    setNewMessages :  React.Dispatch<React.SetStateAction<IMessage[]>>
   
}

export const ChatContext = createContext({} as ChatContextType)
export const ChatContextProvider = ({children}: ChatContextProviderProps)=>{
   
    const [participantId, setParticipantId] = useState<string>('')
    const [participantName, setParticipantName] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const [newMessages, setNewMessages] = useState<IMessage[]>([])
    
    return(
        <ChatContext.Provider  value={{participantId,
                                        setParticipantId, 
                                        participantName, 
                                        setParticipantName,
                                        roomId,
                                        setRoomId,
                                        messages,
                                        setMessages,
                                        newMessages,
                                        setNewMessages}}>
        {children}
        </ChatContext.Provider>
    )
}