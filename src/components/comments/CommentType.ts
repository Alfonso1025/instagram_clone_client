import { IReply } from "../replies/ReplyType"
import { ILike } from "../likes/LikeTypes"
export interface Icomment{
    _id : string
    relatedPost : string
    commentByUser : string //id of the comment author
    userName : string //nameof the author of the comment
    commentContent : string
    likes : ILike[] 
    replies : IReply[]
}