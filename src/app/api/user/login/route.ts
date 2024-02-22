import { connect } from "@/dbConfig/config"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { User } from "@/models/userModel"
import jwt from "jsonwebtoken"
connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const { email, password } = reqBody
        //Check if user already exists or not
        let user = await User.findOne({ email: email })
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User doesn't exists",
                    error: null,
                },
                { status: 400 }
            )
        }
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            )
        }
        console.log(user)

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            data: { uesrname: tokenData.username, email: tokenData.email },
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response
    } catch (e: any) {
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 }
        )
    }
}
