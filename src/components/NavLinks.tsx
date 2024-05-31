import { useAuth } from "@/contexts/userAuthContext"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function NavLinks({ userAuth }: { userAuth: boolean }) {
	const router = useRouter()
	const { logout } = useAuth()
	const pathname = usePathname()

	const publicLinks = [
		{
			text: "Home",
			slug: "/",
		},
	]

	const unauthorizedUserLinks = [
		{
			text: "Signup",
			slug: "/signup",
		},
		{
			text: "Login",
			slug: "/login",
		},
	]

	const authorizedUserLinks = [
		{
			text: "Profile",
			slug: "/profile",
		},
	]

	const handleLogout = async () => {
		try {
			const response = await fetch("/api/users/logout")
			const data = await response.json()

			if (data.success) {
				toast.success("Logout successful")
				logout()
				router.push("/login")
			} else {
				throw new Error(data.error)
			}
		} catch (error: any) {
			toast.error(`Logout failed, ${error.message}`)
			console.log(error.message)
		}
	}

	return (
		<nav className="w-svw bg-zinc-700 text-white">
			<ul className="flex items-center justify-center py-5 gap-10">
				{publicLinks.map((linkObj) => {
					return (
						<li key={linkObj.text}>
							<Link href={linkObj.slug} className={`${pathname === linkObj.slug ? "text-gray-50" : "text-gray-400"}`}>
								{linkObj.text}
							</Link>
						</li>
					)
				})}
				{userAuth
					? authorizedUserLinks.map((linkObj) => {
							return (
								<li key={linkObj.text}>
									<Link
										href={linkObj.slug}
										className={`${pathname === linkObj.slug ? "text-gray-50" : "text-gray-400"}`}>
										{linkObj.text}
									</Link>
								</li>
							)
					  })
					: unauthorizedUserLinks.map((linkObj) => {
							return (
								<li key={linkObj.text}>
									<Link
										href={linkObj.slug}
										className={`${pathname === linkObj.slug ? "text-gray-50" : "text-gray-400"}`}>
										{linkObj.text}
									</Link>
								</li>
							)
					  })}
				{userAuth && (
					<button onClick={handleLogout} className="text-gray-400">
						Logout
					</button>
				)}
			</ul>
		</nav>
	)
}
