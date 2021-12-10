import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { isHttpError } from 'http-errors';

/**
 * HTTP error middleware
 */
const httpError = () => {
  return async (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (isHttpError(error)) {
      res.status(error.statusCode).json({
        error: {
          message: error.message,
          name: error.name,
        },
      });
    }

    return next();
  };
};

export default httpError;
