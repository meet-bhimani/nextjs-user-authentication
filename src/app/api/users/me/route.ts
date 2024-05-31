import { connect } from "@/db/db"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const { token } = reqBody
		const userId = getDataFromToken(token)
		const user = await User.findOne({ _id: userId }).select("-password")
		return NextResponse.json({ message: "User Found", user: user, success: true })
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
