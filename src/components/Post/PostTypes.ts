import { ILike } from "../likes/LikeTypes"

export interface IPost{
    postId  : string
    contentString : string
    urls : string[]
    likes : ILike[]
}