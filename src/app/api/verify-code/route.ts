import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request:Request){
    await dbConnect();
    try{
        const {username,code}=await request.json()
        const decodedUsername= decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername})
        if(!user){
            return Response.json({
                success:false,
                message:"User not found"
            }, {status:400})
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()
        if(isCodeValid && isCodeNotExpired){
            user.isverified = true
            await user.save()
        }else if(!isCodeNotExpired){
            return Response.json({
                success:false,
                message:"Verification code has expired, Please sign-up again to get new code"
            },{status:400})
        }else{
            return Response.json({
                success:false,
                message:"Verification code incorrect"
            },{status:400})
        }

        return Response.json({
            success:true,
            message:"Account verified successfully"
        },{status:200})


    }catch(err){
        return Response.json({
            success:false,
            message:"Error verifying user"
        }, {status:500})
    }

}