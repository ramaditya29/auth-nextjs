"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function LoginPage() {
    const router = useRouter()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)
    const [disableLogin, setDisableLogin] = useState(true)

    const handleLogin = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/user/login", {
                method: "POST",
                body: JSON.stringify(userDetails),
            })
            const data = await response.json()
            console.log("the data is:", data)
            toast.success(`Welcome ${data.username}`)
            router.push("/profile")
        } catch (e) {
            console.error("error")
            toast.error("Error occurred")
        }
    }

    useEffect(() => {
        if (userDetails.email.length > 0 && userDetails.password.length > 0) {
            setDisableLogin(false)
        } else setDisableLogin(true)
    }, [userDetails])

    return (
        <main className="py-2 flex items-center min-h-screen justify-center">
            <form>
                <div className="flex flex-col gap-15 p-6 border-2 w-[400px] border-cyan-500 rounded-lg">
                    <h1 className="text-center text-3xl mb-4">Login</h1>
                    <hr />
                    <div className="flex flex-col gap-2 mt-4">
                        <label>Email</label>
                        <input
                            type="email"
                            className="p-2  focus:border-red-200 rounded-lg text-black"
                            value={userDetails.email}
                            placeholder="Email"
                            onChange={(event) =>
                                setUserDetails({
                                    ...userDetails,
                                    email: event.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <label>Password</label>
                        <input
                            className="p-2 border-blue-100 rounded-lg text-black"
                            type="password"
                            placeholder="password"
                            value={userDetails.password}
                            onChange={(event) =>
                                setUserDetails({
                                    ...userDetails,
                                    password: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center m-8 gap-5">
                        <button
                            type="button"
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-slate-200"
                            disabled={disableLogin}
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                        <div className="flex justify-center gap-2">
                            <span>Not Registered?</span>
                            <Link
                                href="/signup"
                                className="text-red-500 font-semibold"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    )
}
