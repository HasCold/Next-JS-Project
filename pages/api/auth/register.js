import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const { asyncError, errorHandler } = require("../../../middlewares/errorHandler");

const registerHandler = asyncError( async (req, res) => {
    if(req.method !== "POST") 
    return errorHandler(res, 400, "Only POST method is allowed");

    const {name, email, password} = req.body;

    if(!name || !email || !password) 
    return errorHandler(res, 400, "Please Enter All Fields");

    await connectDB();
    // console.log(`${name}, ${email}, ${password}`);


    let user = await User.findOne({email});

    if(user) return errorHandler(res, 400, "User regisered with this email");

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await User.create({
        name, 
        email,
        password : hashedPassword,
    });

    const token = generateToken(user._id);
    cookieSetter(res, token, true);

    res.status(201).json({
        success : true,
        message : "Registered Successfully",
        user
    })
});

export default registerHandler 