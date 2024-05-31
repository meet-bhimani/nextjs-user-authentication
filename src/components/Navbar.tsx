import { cookies } from "next/headers"
import NavLinks from "./NavLinks"

export default function Navbar() {
	const userToken = cookies().get("token")
	const userAuth = userToken ? (userToken.value != "" ? true : false) : false
	return <NavLinks userAuth={userAuth} />
}
