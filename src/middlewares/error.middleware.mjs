const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || "Something went wrong. Please try again later.",
  });
};

export default errorMiddleware;
