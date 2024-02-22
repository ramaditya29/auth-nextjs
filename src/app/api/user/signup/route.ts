import { connect } from "@/dbConfig/config"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { User } from "@/models/userModel"
import { sendEmail } from "@/helpers/mailer"
connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const { username, email, password } = reqBody
        //Check if user already exists or not
        let user = await User.findOne({ email: email })
        if (user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User Already exists",
                    error: null,
                },
                { status: 400 }
            )
        }

        //Create hash for the password
        let salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        let newUser = new User({ email, username, password: hashedPassword })
        const savedUser = await newUser.save()
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id.toString(),
        })
        return NextResponse.json(
            {
                success: true,
                message: "User Registration successful",
                error: null,
                data: { id: savedUser._id, email: savedUser.email },
            },
            { status: 201 }
        )
    } catch (e: any) {
        console.log("error :", e)
        return NextResponse.json(
            { success: false, error: e.message },
            { status: 500 }
        )
    }
}
