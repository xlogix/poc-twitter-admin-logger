function errorMiddleware(error, req, res, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    console.error('[ERROR] ', status, message);
    res.status(status).json({ message });
}
export default errorMiddleware;
//# sourceMappingURL=tweet.middleware.js.map