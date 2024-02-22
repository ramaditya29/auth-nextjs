"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
export default function ResetPassword() {
    const params = useSearchParams()
    const [token, setToken] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [disableResetPasswordButton, setDisableResetPasswordButton] =
        useState(true)
    useEffect(() => {
        if (params?.get("token")) setToken(params?.get("token") || "")
    }, [])

    const resetPassword = async () => {
        try {
            let response = await fetch("/api/user/resetPassword", {
                method: "POST",
                body: JSON.stringify({ token: token, password }),
            })
            let data = await response.json()
            if (!response.ok) {
                setSuccess("")
                setError(data?.error)
            } else {
                setSuccess(data.message)
                setError("")
                setPassword("")
                setCPassword("")
            }
        } catch (e) {
            console.error("Error is: ", e)
            toast.error("Unexpected error occured")
        }
    }

    useEffect(() => {
        if (password === cpassword) {
            setDisableResetPasswordButton(false)
        } else setDisableResetPasswordButton(true)
    }, [password, cpassword])
    const forgotPassword = async () => {}
    return (
        <main className="py-2 flex items-center min-h-screen justify-center">
            <form>
                <div className="flex flex-col gap-15 p-6 border-2 w-[400px] border-cyan-500 rounded-lg">
                    <h1 className="text-center text-3xl mb-4">
                        Reset Password
                    </h1>
                    <hr />
                    {error && (
                        <div className="flex text-red-400 font-semibold text-center items-center justify-center">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="flex text-green-400 font-semibold text-center items-center justify-center">
                            {success}
                        </div>
                    )}
                    <div className="flex flex-col gap-2 mt-4">
                        <label>Password</label>
                        <input
                            type="password"
                            className="p-2  focus:border-red-200 rounded-lg text-black"
                            value={password}
                            placeholder="Password"
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="p-2  border-blue-100 rounded-lg text-black"
                            value={cpassword}
                            placeholder="Confirm Password"
                            onChange={(event) =>
                                setCPassword(event.target.value)
                            }
                        />

                        <div className="flex flex-col justify-center items-center m-8 gap-5">
                            <div className="flex flex-col justify-center gap-2">
                                <button
                                    className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded disabled:bg-slate-200 disabled:cursor-not-allowed"
                                    onClick={resetPassword}
                                    disabled={disableResetPasswordButton}
                                    type="button"
                                >
                                    Change Password
                                </button>
                                <div className="flex justify-center items-center gap-2">
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
                    </div>
                </div>
            </form>
        </main>
    )
}
