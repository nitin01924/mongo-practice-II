const errorMiddleware = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format";
  }

  res.status(status).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
