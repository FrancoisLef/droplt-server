import bcrypt from 'bcrypt';
import { addWeeks } from 'date-fns';
import { NextFunction, Response, Router } from 'express';
import { InternalServerError, NotFound } from 'http-errors';
import jwt from 'jsonwebtoken';

import {
  AUTH_UNKNOWN_EMAIL,
  AUTH_WRONG_PASSWORD,
  COMMON_ERROR,
} from '../../helpers/errors';
import { validate } from '../../middlewares';
import prisma from '../../modules/prisma';
import { LoginRequest, loginSchema } from './schema';

const router = Router();

const { APP_NAME, NODE_ENV, JWT_SECRET } = process.env;

router.post(
  '/login',
  validate(loginSchema),
  async (req: LoginRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return next(new NotFound(AUTH_UNKNOWN_EMAIL));
      }

      const isMatch = await bcrypt.compare(user.password, password);

      if (!isMatch) {
        return next(new NotFound(AUTH_WRONG_PASSWORD));
      }

      const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: '10m',
        issuer: APP_NAME,
        audience: APP_NAME,
      });

      const refreshToken = jwt.sign({ userId: user.userId }, JWT_SECRET, {
        expiresIn: '1w',
        issuer: APP_NAME,
        audience: APP_NAME,
      });

      res
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: NODE_ENV === 'production',
          expires: addWeeks(new Date(), 1),
          signed: true,
          sameSite: true,
        })
        .json({ token });
    } catch (err) {
      return next(new InternalServerError(COMMON_ERROR));
    }
  }
);

export default router;
