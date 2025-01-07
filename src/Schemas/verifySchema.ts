import {z} from "zod"

export const verifySchema = z.object({
    code:z.string().length(6,"Verification code muust be 6 digits")
})