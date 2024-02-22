import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"
export async function getTokenFromRequest(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id
    } catch (e: any) {
        throw new Error(e.message)
    }
}

export interface Userinfo {
    username: string
    email: string
    id: string
}
