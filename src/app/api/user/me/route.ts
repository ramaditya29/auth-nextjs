import { connect } from "@/dbConfig/config"
import { NextRequest, NextResponse } from "next/server"
import { User } from "@/models/userModel"
import { getTokenFromRequest } from "@/helpers/getTokenFromRequest"
connect()
export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenFromRequest(request)
        const user = await User.findOne({ _id: userId }).select("-password")
        return NextResponse.json({
            mesaaage: "User found",
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
