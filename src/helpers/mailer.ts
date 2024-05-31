import User from "@/models/userModel"
import { EmailType } from "@/utils/EmailEnum"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

export const sendMail = async ({
	email,
	emailType,
	userId,
}: {
	email: string
	emailType: EmailType
	userId: string
}) => {
	try {
		const hashedToken = await bcrypt.hash(userId, 10)

		if (emailType === EmailType.verify) {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			})
		} else if (emailType === EmailType.reset) {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			})
		}

		var transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASSWORD,
			},
		})

		const mailOptions = {
			from: process.env.MY_EMAIL,
			to: email,
			subject: emailType === EmailType.reset ? "Reset your password" : "Verify your email",
			html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${
				emailType === EmailType.reset ? "Reset your password" : "Verify your email"
			} or copy and paste the link below in your browser. <br> ${
				process.env.domain
			}/verifyemail?token=${hashedToken}      
      </p>`,
		}

		const mailResponse = await transport.sendMail(mailOptions)
		return mailResponse
	} catch (error: any) {
		console.log(error.message)
		throw new Error(error.message)
	}
}
