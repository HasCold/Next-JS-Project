import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const { asyncError, errorHandler } = require("../../../middlewares/errorHandler");

const registerHandler = asyncError( async (req, res) => {
    if(req.method !== "POST") 
    return errorHandler(res, 400, "Only POST method is allowed");

    const {email, password} = req.body;

    if(!email || !password) 
    return errorHandler(res, 400, "Please Enter All Fields");

    await connectDB();

    // When you query for a user document, you can explicitly include the password field in the query results by passing the select option with the value true in the query. For example, you can include the password field in the query results like this:

    const user = await User.findOne({email}).select("+password");

    if(!user) return errorHandler(res, 400, "Invalid Email or Password");

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return errorHandler(res, 400, "Invalid Email or Password");

    const token = generateToken(user._id);
    cookieSetter(res, token, true);

    res.status(200).json({
        success : true,
        message : `Welcome back ! ${user.name}`,
        user,
    })
});

export default registerHandler 