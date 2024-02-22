import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import { User } from "@/models/userModel"
import { connect } from "@/dbConfig/config"
connect()
export async function sendEmail({
    email,
    emailType,
    userId,
}: {
    email: string
    emailType: "VERIFY" | "RESET"
    userId: string
}) {
    try {
        //Create a hashed token
        const hashedToken = await bcryptjs.hash(userId, 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                { _id: userId },
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000,
                }
            )
        } else if (emailType === "RESET") {
            let data = await User.findByIdAndUpdate(
                { _id: userId },
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000,
                    },
                }
            )
            console.log(data)
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        })

        const mailOptions = {
            from: "ramaditya29@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html:
                emailType === "VERIFY"
                    ? `<p>Click <a href="${
                          process.env.DOMAIN
                      }/verifyemail?token=${hashedToken}">here</a> to ${"verify your email"}
          or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
          }/verifyemail?token=${hashedToken}
          </p>`
                    : `<p>Click <a href="${
                          process.env.DOMAIN
                      }/resetpassword?token=${hashedToken}">here</a> to ${"reset your password"}
      or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
      }/resetpassword?token=${hashedToken}
      </p>`,
        }

        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse
    } catch (e: any) {
        throw new Error(e.message)
    }
}
