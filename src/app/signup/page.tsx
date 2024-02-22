"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function SignupPage() {
    const [userDetails, setUserDetails] = useState({
        email: "",
        username: "",
        password: "",
    })
    const [disableSignupButton, setDisableSignupButton] = useState(true)
    const [loading, setLoading] = useState(false)
    const handleSignup = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/user/signup", {
                method: "POST",
                body: JSON.stringify(userDetails),
            })
            const data = await response.json()
            console.log("the data is:", data)

            toast.success("User Registration Successful")
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (
            userDetails.email.length > 0 &&
            userDetails.password.length &&
            userDetails.username.length > 0
        ) {
            setDisableSignupButton(false)
        } else setDisableSignupButton(true)
    }, [userDetails])
    return (
        <main className="py-2 flex items-center min-h-screen justify-center">
            <form>
                <div className="flex flex-col gap-15 p-6 border-2 w-[400px] border-cyan-500 rounded-lg">
                    <h1 className="text-center text-3xl mb-4">
                        {loading ? "Processing..." : "Sign Up"}
                    </h1>
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
                        <label>Name</label>
                        <input
                            type="text"
                            className="p-2  border-blue-100 rounded-lg text-black"
                            value={userDetails.username}
                            placeholder="username"
                            onChange={(event) =>
                                setUserDetails({
                                    ...userDetails,
                                    username: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label>Password</label>
                        <input
                            className="p-2  border-blue-100 rounded-lg text-black"
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
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-slate-200 disabled:cursor-not-allowed"
                            onClick={handleSignup}
                            disabled={disableSignupButton}
                        >
                            Sign Up
                        </button>
                        <div className="flex justify-center gap-2">
                            <span>Already Registered? </span>
                            <Link
                                href="/login"
                                className="text-red-500 font-semibold"
                            >
                                Go to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    )
}
