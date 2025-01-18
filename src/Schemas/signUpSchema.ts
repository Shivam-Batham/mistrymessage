import { z } from "zod";

export const usernameValidate = z
                            .string()
                            .min(1, "Username must be atleast 1 chareters.")
                            .max(20, "Username must be not than more 20 chareters.")
                            .regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special charecter")

export const signUpSchema = z.object({
    username:usernameValidate,
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(8,{message:"password must be at least 8 charecters"})
    .max(20,{message:"Password must be not more than 20 charecters"})
    
})