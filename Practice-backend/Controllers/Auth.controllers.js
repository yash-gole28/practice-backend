import UserModal from "../Modals/User.modal.js"
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken"

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body.userData
        if (!email || !password) return res.status(401).json({ success: false, message: "incomplete" })

        const user = await UserModal.findOne({ email })
        // console.log(user, "user")
        if (!user) return res.status(401).json({ success: false, message: "invalid email" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) return res.status(401).json({ success: false, message: "wrong password" })
        console.log(isPasswordCorrect, "check here")

        const token = await Jwt.sign({ id : user._id }, process.env.JWT_SECRET)
        console.log(token)
        // console.log({user: { name: user.name, id: user._id },token: token })
        return res.status(200).json({ success: true, message: "login successful", user: { name: user.name, id: user._id },token: token })
    } catch (error) {
        res.status(500).json({ success: false, message: 'error' })
    }
}

export const Register = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, email, password } = req.body.userData
        // console.log(name, email , password , "data ")

        if (!name || !email || !password) return res.status(401).json({ success: false, message: "all fields are mandatory" })

        const hashedPassword = await bcrypt.hash(password, 10)

        // console.log(hashedPassword, " - password")

        const user = new UserModal({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
        return res.status(200).json({ success: true, message: "registration successful" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error })
    }
}

export const getCurrentUser =async (req, res)=> {
    try {
        const { token } = req.body;

        if (!token) return res.status(401).json({ success: false, message: "Token is required." })

        const {id } = await Jwt.verify(token, process.env.JWT_SECRET)
         console.log(id, 'id')

        const user = await UserModal.findById(id);

        if (!user) return res.status(401).json({ success: false, message: "User not found." })

        return res.status(200).json({ success: true, user: { name: user.name, id: user._id } })

    } catch (error) {

        return res.status(500).json({ success: false, message: error })
    }


}