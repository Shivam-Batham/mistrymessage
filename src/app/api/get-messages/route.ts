import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import { User } from "next-auth"; 
import mongoose from "mongoose";

export async function GET(){

    await dbConnect();
    const session = await getServerSession(authOptions)
    const user:User = session?.user as User;
    if(!session || !session.user){
        return Response.json({
            success:false,
            message:"Not Authenticated"
        },{status:400})
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    try{
        const user = await UserModel.findById({_id:userId})
       
        // const user = await UserModel.aggregate([
        //     {$match:{id:userId}},
        //     {$unwind:"$messages"},
        //     {$sort:{"messages.createdAt":-1}},
        //     {$group:{_id:"$_id",messages:{$push:"$messages"}}}
        // ]).exec()
       
        if(!user ){
            return Response.json({
                success:false,
                message:"User not Found",
            },{status:404})
        }
        return Response.json({
            success:true,
            message:"User message Found",
            messages:user.messages
        },{status:200})
    }catch(err){
        return Response.json({
            success:false,
            message:"Error in getting message"
        },{status:500})
    }
     
}