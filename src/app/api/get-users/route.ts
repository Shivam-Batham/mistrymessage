
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function GET(request: Request) {

    await dbConnect();
    try {
        const users = await UserModel.find({}, "username");

        if (!users) {
            return Response.json({
                success: false,
                message: "User not Found",
            }, { status: 404 })
        }
        return Response.json({
            success: true,
            message: "User  Found",
            users: users
        }, { status: 200 })
    } catch (err) {
        console.log("Error in getting users", err)
        return Response.json({
            success: false,
            message: "Error in getting users"
        }, { status: 500 })
    }

}