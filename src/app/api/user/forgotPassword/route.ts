import { connect } from "@/dbConfig/config"
import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        console.log(email)

        const user = await User.findOne({
            email: email,
        })

        if (!user) {
            return NextResponse.json(
                { error: "User Id not found" },
                { status: 400 }
            )
        }
        console.log("the user id: ", user)

        await sendEmail({
            email: email,
            emailType: "RESET",
            userId: user._id.toString(),
        })

        return NextResponse.json({
            message: "Forgot Password Link emailed successfully",
            success: true,
        })
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
