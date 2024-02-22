"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
export default function ProfilePage() {
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        username: "",
        id: "",
        isAdmin: false,
        isVerified: false,
        email: "",
    })

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await fetch("/api/user/me")
            const data = await response.json()
            console.log(data)
            setUserDetails(data.data)
        }
        fetchUserDetails()
    }, [])
    const handleLogout = async () => {
        try {
            await fetch("/api/user/logout")

            router.push("/login")
        } catch (e) {
            console.error("Error in logging out")
        }
    }
    return (
        <div className="py-2 flex flex-col items-center   min-h-screen  justify-center">
            <h1>Profile Page</h1>
            <div className="flex flex-col py-4 p-10 gap-6 border-2 border-blue-500 mb-5">
                <div className="flex gap-4">
                    <div>Username: </div>
                    <div>{userDetails.username}</div>
                </div>
                <div className="flex gap-4">
                    <div>Email: </div>
                    <div>{userDetails.email}</div>
                </div>
            </div>
            <button
                className="text-white p-4 border-red-100 bg-red-400 hover:bg-red-300 rounded-lg"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}
