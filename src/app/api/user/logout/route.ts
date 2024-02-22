import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json(
            { message: "User loggedout successfully", success: true },
            { status: 200 }
        )
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        return response
    } catch (e: any) {
        return NextResponse.json(
            { error: e.message, success: false },
            { status: 500 }
        )
    }
}
