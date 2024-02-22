import mongoose from "mongoose"
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on("open", () => {
            console.log("Connection open")
        })

        connection.on("error", (e) => {
            console.error(e)
        })
    } catch (e) {
        console.error(e)
    }
}
