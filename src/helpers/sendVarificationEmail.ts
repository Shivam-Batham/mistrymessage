import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmailtemplate";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVarificationEmail(email:string,username:string,verifyCode:string):Promise<ApiResponse> {
    try{

        // const { data, error } =
         await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mistry message | Verification email',
            react: VerificationEmail({username,otp:verifyCode }),
        });

        return {
            success: true,
            message: "Verification email sent successfully"
        }
    }catch(err){
        return {success:false,message:"Failed to send verificatoin email"}
    }
}