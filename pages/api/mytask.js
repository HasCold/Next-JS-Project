import { asyncError, errorHandler } from "@/middlewares/errorHandler";
import { Task } from "@/models/task";
import { checkAuth, connectDB} from "@/utils/features";

const handler = asyncError(async (req, res) => {
        
        if(req.method !== "GET") return errorHandler(res, 400, "Only GET method is allowed");
        
    await connectDB();

        const user = await checkAuth(req);
    if(!user) return errorHandler(res, 401, "Login First");

    const todosTask = await Task.find({user : user._id});

    res.json({
        success : true,
        todosTask
    })
} 
);

export default handler;