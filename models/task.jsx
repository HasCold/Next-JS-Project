import mongoose from "mongoose";

const schema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    isCompleted : {
        type : Boolean,
        default : false,
    },
    user : {
        // The required property indicates that a user value must be present in order to save a Task document. The ref property specifies the name of the related model, in this case "User", which is used for population, allowing to retrieve the related User object when querying the Task object.
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
    },
    createdAt : {
        type : Date,
        default : Date.now,
    
    }
});

mongoose.models = {};
export const Task = mongoose.model("Task", schema);
