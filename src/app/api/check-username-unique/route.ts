import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
import {z} from "zod"
import { usernameValidate } from "../../../schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username:usernameValidate
})

export async function GET(request :Request){

    await dbConnect();
    try{
        const  {searchParams} = new URL(request.url)
        const queryParam = {
            username : searchParams.get("username")
        }
        const result = UsernameQuerySchema.safeParse(queryParam);
        if(!result.success){
            // const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success:false,
                message:"Invalid query parameters"
            },{status:400})
        }

        const {username} = result.data;
       const existingverifiedUsername = await UserModel.findOne({
            username,isverified:true
        })
        if(existingverifiedUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400})
        }
        return Response.json({
            success:true,
            message:"Username is available"
        },{status:200})

    }catch(err){
        return Response.json({
            success:false,
            message:"Errro checking username"
        },{status:500})
    }

}