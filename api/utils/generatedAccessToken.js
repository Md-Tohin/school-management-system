import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import UserModel from "../models/user.model.js"
dotenv.config()

const generatedAccessToken = async(userId) => {
    const token = await jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: '5h' })

    return token;
}

export default generatedAccessToken