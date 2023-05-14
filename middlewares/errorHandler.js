export const errorHandler = (res, statusCode=500, message = "Internal Server Error") => {
    return res.status(statusCode).json({
        success : false,
        message
    });
};

export const asyncError = (passedFunc) => (req, res) => {   // It return another function which is the newtask component function in this case  
    return   Promise.resolve(passedFunc(req, res)).catch((err) => {
         return   errorHandler(err, 500, err.message);
        })
};


// Expalnation of Both above functions :- 

// Sure, let me explain the asyncError function:

// The asyncError function is a higher-order function that takes a function passedFunc as its argument and returns another function. This returned function is used to wrap around asynchronous functions and provide error handling for any exceptions that may be thrown during their execution.

// The returned function takes req and res as its arguments, which are the request and response objects passed in by Express.

// Inside this returned function, passedFunc is executed by calling Promise.resolve(passedFunc(req, res)). This converts the result of calling passedFunc into a promise if it is not already one.

// If the promise is resolved successfully, the function returns the result. If an error is thrown in the function, the catch block catches the error and returns the result of calling the errorHandler function.

// The errorHandler function is a simple function that takes in a response object, a status code, and a message. It then sends a response to the client with the specified status code and message.