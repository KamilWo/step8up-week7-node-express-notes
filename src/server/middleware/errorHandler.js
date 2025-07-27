// This file defines a global error handling middleware.
// It catches errors that occur during request processing and sends a consistent error response.

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  // Set a default status code and message
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred.";

  res.status(statusCode).json({
    success: false,
    message: message,
    // In production, we might not want to send the error stack to the client
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorHandler;
