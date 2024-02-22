import { connect } from "@/dbConfig/config"
import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody
        console.log(token)
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        })

        if (!user) {
            return NextResponse.json(
                { error: "Forgot password token expired" },
                { status: 400 }
            )
        }
        console.log(user)
        //Create Hash
        const salt = await bcryptjs.genSalt(10)

        //Apply salt to password
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Password updated successfully",
            success: true,
        })
    } catch (error: any) {
        console.log("Error", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
