"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function VerifyEmailPage() {
    const params = useSearchParams()
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    useEffect(() => {
        if (params?.get("token")) setToken(params.get("token")!)
    }, [params])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])

    const verifyEmail = async () => {
        try {
            const response = await fetch("/api/user/verifyemail", {
                method: "POST",
                body: JSON.stringify({ token }),
            })
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setError(false)
                setVerified(true)
            } else {
                setError(true)
                setVerified(false)
            }
        } catch (e) {
            console.log("Here")
            setError(true)
        }
    }
    return (
        <div className="flex flex-col py-2 items-center justify-center">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token"}
            </h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2x text-red-500 p-4 m-4">
                        Invalid Token or Expired token
                    </h2>
                </div>
            )}
        </div>
    )
}
