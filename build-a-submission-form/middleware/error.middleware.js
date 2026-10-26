export const notFoundHandler = (req, res, next) => {
    const err = new Error(`${req.originalUrl} not found`)
    err.status = 404
    next(err)
}

export const finalErrorHandler = (err, req, res, next) => {
    console.log(err)
    console.log("err.message", err.message)
    res.status = err.status || 500
    const message = res.status === 500 ? "Internal Server Error (Check Server Logs)" : err. message
    res.json({error: true, status: res.status, message})    
}