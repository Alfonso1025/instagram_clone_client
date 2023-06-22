import { createContext, useState } from "react";
import { Icomment } from "../components/comments/CommentType";


type PostContextProviderProps = {
    children: React.ReactNode
}


type PostContextType= {
    
    postId : string
    setPostId : React.Dispatch<React.SetStateAction <string> >   
    comments : Icomment[]
    setComments : React.Dispatch<React.SetStateAction<Icomment[]>> 
    commentId : string
    setCommentId : React.Dispatch<React.SetStateAction <string> > 
    
}

export const PostContext = createContext({} as PostContextType)

export const PostContextProvider = ({children}: PostContextProviderProps)=>{
   
    const [postId, setPostId] = useState<string>('')
    const [comments, setComments] = useState<Icomment[]>([])
    const [commentId , setCommentId] = useState<string>('')
    return(
        <PostContext.Provider  value={{postId, setPostId, comments, setComments, commentId, setCommentId }}>
        {children}
        </PostContext.Provider>
    )
}