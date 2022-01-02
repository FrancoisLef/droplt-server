import { body } from 'express-validator';

export interface SigninRequest extends Express.Request {
  body: {
    email: string;
    password: string;
  };
}

export const signinSchema = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];
