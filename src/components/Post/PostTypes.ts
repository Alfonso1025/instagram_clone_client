import { ILike } from "../likes/LikeTypes"

export interface IPost{
    postId  : string
    author : string
    contentString : string
    urls : string[]
    likes : ILike[]
}