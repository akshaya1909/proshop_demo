const notFound = (req, res, next) => {
    //used here to provide additional information about the missing resource
    const error = new Error(`Not Found- ${req.originalUrl}`);

    res.status(404);

    //Passes the error to the next middleware, which is the errorHandler.
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
};

export {notFound, errorHandler};