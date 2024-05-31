import mongoose from "mongoose"

export async function connect() {
	try {
		mongoose.connect(process.env.MONGODB_URI!)
		const connection = mongoose.connection

		connection.on("connected", () => {
			console.log("Database connected successfully")
		})

		connection.on("error", (error) => {
			console.log("MongoDB connection error", error)
		})
	} catch (error) {
		console.log("Connection to Database failed. Something went wrong!")
		console.log(error)
	}
}
