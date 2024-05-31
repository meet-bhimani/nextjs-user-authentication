import { connect } from "@/db/db"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const { email, password } = reqBody

		const user = await User.findOne({ email })
		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 400 })
		}

		const validPassword = await bcryptjs.compare(password, user.password)

		if (!validPassword) {
			return NextResponse.json({ error: "Wrong credentials" }, { status: 400 })
		}
		// if you don't want to use token then directly send success response
		// return NextResponse.json({ message: "User Logged in successfully", success: true, status: 200, user })

		const tokenData = {
			id: user._id,
			username: user.name,
			email: user.email,
		}

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

		const response = NextResponse.json({
			message: "User logged in successfully",
			success: true,
		})

		response.cookies.set("token", token, { httpOnly: true })

		return response
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
