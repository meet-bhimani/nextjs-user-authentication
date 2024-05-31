import { cookies } from "next/headers"
import Link from "next/link"

export default async function ProfilePage() {
	const token = cookies().get("token")?.value
	const response = await fetch("http://localhost:3000/api/users/me", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ token }),
	})
	const { user } = await response.json()
	return (
		<div>
			<h1>Profile page</h1>
			<p>Name: {user.username}</p>
			<Link className="bg-blue-300" href={`/profile/${user._id}`}>
				Id: {user._id}
			</Link>
		</div>
	)
}
