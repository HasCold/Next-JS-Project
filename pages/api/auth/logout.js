import { cookieSetter} from "@/utils/features";

const { asyncError, errorHandler } = require("../../../middlewares/errorHandler");

const registerHandler = asyncError( async (req, res) => {
    if(req.method !== "GET") 
    return errorHandler(res, 400, "Only GET method is allowed");

    cookieSetter(res, null, false);

    res.status(200).json({
        success : true,
        message : "Logged Out Successfully",
    })
});

export default registerHandler 