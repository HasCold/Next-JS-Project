import { asyncError, errorHandler } from "@/middlewares/errorHandler";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";

const handler = asyncError(async (req, res) => {
        
        if(req.method !== "POST") return errorHandler(res, 400, "Only POST method is allowed");
        
        const {title, description} = req.body;
        if(!title || !description) return errorHandler(res, 400, "Please Enter All Fields");

    await connectDB();

    const user = await checkAuth(req);
    if(!user) return errorHandler(res, 401, "Login First");

    await Task.create({
        title, 
        description,
        user : user._id  
    })

    res.json({
        success : true,
        message : "Task Created"
    })
} 
)
export default handler;