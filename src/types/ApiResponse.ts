import User, { Message } from "@/model/User";
export type getUser = {
    username :string,
    _id:string
}
export interface ApiResponse {
    success:boolean;
    message:string;
    isAcceptingMessage?:boolean;
    messages?: Array<Message>;
    users?:Array<getUser>;
    
}