"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

export default function SignUpPage() {
	const router = useRouter()
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
	})
	const [loading, setLoading] = useState(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			setLoading(true)
			const response = await fetch("/api/users/signup", {
				method: "POST",
				body: JSON.stringify(user),
			})
			const data = await response.json()
			if (data.success) {
				toast.success("Registration successful")
				setUser({ username: "", email: "", password: "" })
				router.push("/login")
			} else {
				throw new Error(data.error)
			}
		} catch (error: any) {
			toast.error(`Registration failed, ${error.message}`)
			console.log(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col mt-20 items-center justify-center">
			<form onSubmit={handleSubmit} className="p-7 bg-gray-50 w-[min(90vw,400px)] shadow-lg rounded-lg">
				<h1 className="mb-5 text-2xl text-center">Signup Here</h1>
				<div className="mb-4 w-full flex items-center">
					<input
						className="border border-gray-400 outline-none focus:border-gray-700 py-2 px-3 rounded-lg shadow-sm flex-1"
						type="text"
						name="username"
						id="username"
						value={user.username}
						onChange={handleChange}
						placeholder="username"
					/>
				</div>

				<div className="mb-4 w-full flex items-center">
					<input
						className="border border-gray-400 outline-none focus:border-gray-700 py-2 px-3 rounded-lg shadow-sm flex-1"
						type="email"
						name="email"
						id="email"
						value={user.email}
						onChange={handleChange}
						placeholder="email"
					/>
				</div>

				<div className="mb-4 w-full flex items-center">
					<input
						className="border border-gray-400 outline-none focus:border-gray-700 py-2 px-3 rounded-lg shadow-sm flex-1"
						type="password"
						name="password"
						id="password"
						value={user.password}
						onChange={handleChange}
						placeholder="password"
					/>
				</div>

				<p className="text-sm text-right">
					Already registered?
					<Link className="ml-1 underline" href="/login">
						Login here
					</Link>
				</p>

				<button
					type="submit"
					className={twMerge(
						"py-2 bg-gray-900 text-white rounded-full w-full mt-4 hover:bg-gray-600",
						loading ? "cursor-not-allowed bg-gray-400 hover:bg-gray-400" : "cursor-pointer"
					)}
					disabled={loading}>
					{loading ? "Submitting..." : "Signup"}
				</button>
			</form>
		</div>
	)
}
