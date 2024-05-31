import { connect } from "@/db/db"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer"
import { EmailType } from "@/utils/EmailEnum"

connect()

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const { username, email, password } = reqBody

		const user = await User.findOne({ email })

		if (user) {
			return NextResponse.json({ error: "Email already exist" }, { status: 400 })
		}

		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		})

		const savedUser = await newUser.save()

		await sendMail({ email, emailType: EmailType.verify, userId: savedUser._id.toString() })

		return NextResponse.json({
			message: "User registered successfully",
			success: true,
			status: 201,
			savedUser,
		})
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
