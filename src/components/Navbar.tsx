"use client"

import { cookies } from "next/headers"
import NavLinks from "./NavLinks"
import { useAuth } from "@/contexts/userAuthContext"

export default function Navbar() {
	// const userToken = cookies().get("token")
	// const userAuth = userToken ? (userToken.value != "" ? true : false) : false
	const { isAuthenticated } = useAuth()
	return <NavLinks userAuth={isAuthenticated} />
}
