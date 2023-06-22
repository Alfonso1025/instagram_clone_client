export interface Iparticipant{
    id : string
    name : string
}
export interface IMessage{
    author : string
    content : string
    time : string
}
export interface IChat{
    _id : string
    participants : Iparticipant[]
    messages : IMessage[]
}