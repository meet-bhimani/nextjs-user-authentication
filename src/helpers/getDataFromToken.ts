import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const getDataFromToken = (token: string) => {
	try {
		const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
		return decodedToken.id
	} catch (error: any) {
		throw new Error(error.message)
	}
}
