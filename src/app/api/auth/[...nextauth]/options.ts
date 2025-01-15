import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export const authOptions :NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                username:{label:"Username" ,type:"text",placeholder:"Username or Email"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect()
                try{
                   const user =  await UserModel.findOne({
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })

                    if(!user){
                        throw new Error("No user Found with this username or email.")
                    }
                    if(!user.isverified){
                        throw new Error("Please verify your account before login")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                    if(isPasswordCorrect){
                        return user
                    }else{
                        throw new Error("Incorrect Password");
                    }

                }catch(err:any){
                    throw new Error(err);
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token._id=user._id?.toString();
                token.isVerified=user.isVerified;
                token.isAcceptingMessages=user.isAcceptingMessages;
                token.username=user.username;
            }
            return token
        },
        async session({ session, token }) {
           if(token){
            session.user._id=token._id ;
            session.user.isVerified=token.isVerified;
            session.user.isAcceptingMessages=token.isAcceptingMessages;
            session.user.username= token.username;
           }
            return session
        },
    },
    secret:process.env.NEXTAUTH_SECRET,
    session:{
        strategy:"jwt"
    },
    pages:{
        signIn:"/sign-in"
    },
}