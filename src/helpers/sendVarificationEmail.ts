import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmailtemplate";

import { ApiResponse } from "@/type/ApiResponse";

export async function sendVarificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse> {
    try{

        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mistry message | Verification email',
            react: VerificationEmail({username,otp:verifyCode }),
        });

        return{success:true,message:"Verificatoin email send sucessfully"}
    }catch(err){
        console.log("Error sending email",err);
        return {success:false,message:"Failed to send verificatoin email"}
    }
}