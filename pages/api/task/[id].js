import { asyncError, errorHandler } from "@/middlewares/errorHandler";
import { Task } from "@/models/task";
import { checkAuth, connectDB} from "@/utils/features";

const handler = asyncError(async (req, res) => {
        
            await connectDB();
        
        const user = await checkAuth(req);
        if(!user) return errorHandler(res, 401, "Login First");
        const taskId = req.query.id;
        const task = await Task.findById(taskId);

        if(!task) return errorHandler(res, 404, "Task Not Found");
        
        if(req.method === "PUT"){
            
            task.isCompleted = !task.isCompleted;   // Process reverse

            await task.save();

            res.status(200).json({
                success : true,
                message : "Task Updated Successfully"
            })

        }else if(req.method === "DELETE"){
            await task.deleteOne();

            res.status(200).json({
                success : true,
                message : "Task Deleted Successfully",
            })

        } else{
            return errorHandler(res, 400, "This method is not available");
        }
        

    const todosTask = await Task.find({user : user._id});

    res.json({
        success : true,
        todosTask
    })
} 
);

export default handler;