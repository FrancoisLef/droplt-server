import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

/**
 * Authentication error middleware
 */
const authError = () => {
  return async (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error.name === 'UnauthorizedError') {
      res.status(401).send('invalid token …');
    } else {
      next(error);
    }
  };
};

export default authError;
