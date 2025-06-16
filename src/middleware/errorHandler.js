const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  // Default error
  let error = { ...err };
  error.message = err.message;

  // Prisma errors
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        error.message = 'Duplicate entry found';
        error.statusCode = 409;
        break;
      case 'P2025':
        error.message = 'Record not found';
        error.statusCode = 404;
        break;
      case 'P2003':
        error.message = 'Foreign key constraint failed';
        error.statusCode = 400;
        break;
      case 'P2014':
        error.message = 'Invalid ID provided';
        error.statusCode = 400;
        break;
      default:
        error.message = 'Database error occurred';
        error.statusCode = 500;
    }
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    error.message = messages.join(', ');
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  // MongoDB cast errors
  if (err.name === 'CastError') {
    error.message = 'Invalid ID format';
    error.statusCode = 400;
  }

  // File upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.message = 'File size too large';
    error.statusCode = 413;
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error.message = 'Too many files uploaded';
    error.statusCode = 413;
  }

  // Rate limit errors
  if (err.status === 429) {
    error.message = 'Too many requests, please try again later';
    error.statusCode = 429;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err
    })
  });
};

export default errorHandler;