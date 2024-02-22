import mongoose from "mongoose"

const UserModelSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Please provide an username"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})

export const User =
    mongoose.models.users || mongoose.model("users", UserModelSchema)
