"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function VerifyEmailPage() {
	const [token, setToken] = useState("")
	const [verified, setVerified] = useState(false)
	const [error, setError] = useState("")

	const verifyEmail = async () => {
		try {
			const response = await fetch("/api/users/verifyemail", {
				method: "POST",
				body: JSON.stringify({ token }),
			})
			const data = await response.json()
			if (!data.success) {
				throw new Error(data.error)
			}
			setVerified(true)
		} catch (error: any) {
			console.log(error.message)
			setVerified(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		const token = window.location.search.split("=")[1]
		setToken(token || "")
	}, [])

	useEffect(() => {
		if (token) {
			verifyEmail()
		}
	}, [token])

	return (
		<div className="flex flex-col items-center justify-center mt-10 py-2">
			<h2 className="p-2 bg-orange-500 text-black">Token: {token ? `${token}` : "Fetching..."}</h2>
			<h1 className="text-3xl mt-5">{verified ? "Email verified successfully" : error ? "" : '"Processing..."'}</h1>

			{verified && (
				<button className="px-3 py-1 bg-blue-400 mt-3">
					<Link href="/login">Login</Link>
				</button>
			)}
			{error && (
				<div>
					<h2 className="text-xl px-2 py-1 mt-3 bg-red-500 text-black">{error}</h2>
				</div>
			)}
		</div>
	)
}
