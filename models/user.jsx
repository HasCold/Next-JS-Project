import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        // In your case, the select: false option on the password field means that the password field will not be included in the query results by default. This is a common practice in many web applications, as it helps to prevent the password from being exposed in the response body, especially in situations where the response might be logged or intercepted.
        type : String,
        required : true,
        select : false,
        minLength : [6, "Password too short"],
    },
});

mongoose.models = {};
export const User = mongoose.model("User", schema);
