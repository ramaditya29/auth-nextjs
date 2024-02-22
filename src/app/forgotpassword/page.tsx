"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [disableForgotPasswordButton, setDisableForgotPasswordButton] =
        useState(true)
    const forgotPassword = async () => {
        try {
            let response = await fetch("/api/user/forgotPassword", {
                method: "POST",
                body: JSON.stringify({ email: email }),
            })

            let data = await response.json()
            if (!response.ok) {
                setError(data.error)
                setSuccess("")
                toast.error(data.error)
            } else {
                setError("")
                setSuccess(data.message)
                toast.success(data.message)
            }
        } catch (e) {
            toast.error("unexpected error occurred")
        }
    }
    useEffect(() => {
        if (email.length > 0) {
            setDisableForgotPasswordButton(false)
        } else setDisableForgotPasswordButton(true)
    }, [email])
    return (
        <main className="py-2 flex items-center min-h-screen justify-center">
            <form>
                <div className="flex flex-col gap-15 p-6 border-2 w-[600px] border-cyan-500 rounded-lg">
                    <h1 className="text-center text-3xl mb-4">
                        Forgot Password
                    </h1>
                    <hr />
                    {error && (
                        <div className="flex text-red-400 font-semibold text-center items-center justify-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="flex items-center justify-center text-green-500 font-semibold">
                            {success}
                        </div>
                    )}
                    <div className="flex gap-2 mt-4">
                        <input
                            type="email"
                            className="p-2 w-[100%] focus:border-red-200 rounded-lg text-black"
                            value={email}
                            placeholder="Email Id"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <button
                            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded disabled:bg-slate-200 disabled:cursor-not-allowed"
                            onClick={forgotPassword}
                            type="button"
                            disabled={disableForgotPasswordButton}
                        >
                            Forgot Password
                        </button>
                    </div>

                    <div className="flex flex-col justify-center items-center m-8 gap-5">
                        <div className="flex justify-center gap-2">
                            <span>Back to </span>
                            <Link
                                href="/login"
                                className="text-red-500 font-semibold"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    )
}
