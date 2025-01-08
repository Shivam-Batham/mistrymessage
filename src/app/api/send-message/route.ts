import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { messageSchema } from "@/Schemas/messageSchema";
import { Message } from "@/model/User";

export async function POST(request:Request){
    await dbConnect();
    const {username,content} = await request.json();
    try{
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success:false,
                message:"User not Found",
            },{status:404})
        }
        // is user accepting msgs
        if(!user.isAcceptingMessage){
            return Response.json({
                success:false,
                message:"User is not accepting messages"
            },{status:403})
        }
        const newMessage = {content,createdAt:new Date()}
        user.messages.push(newMessage as Message);
        return Response.json({
            success:true,
            message:"Message sent succesfully"
        },{status:200})
    }catch(err){
        console.log("Error in adding message",err)
        return Response.json({
            success:false,
            message:"Error in sending message"
        },{status:500})
    }
}