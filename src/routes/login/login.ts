import bcrypt from 'bcrypt';
import { NextFunction, Response, Router } from 'express';
import { InternalServerError, NotFound } from 'http-errors';

import { REFRESH_TOKEN_COOKIE_OPTS, signin } from '../../helpers/auth';
import {
  AUTH_UNKNOWN_EMAIL,
  AUTH_WRONG_PASSWORD,
  COMMON_ERROR,
} from '../../helpers/errors';
import { validate } from '../../middlewares';
import prisma from '../../prisma';
import { LoginRequest, loginSchema } from './schema';

const router = Router();

router.post(
  '/api/login',
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

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return next(new NotFound(AUTH_WRONG_PASSWORD));
      }

      const { token, refreshToken } = await signin(user);

      res
        .cookie('refresh_token', refreshToken, REFRESH_TOKEN_COOKIE_OPTS)
        .json({ token });
    } catch (err) {
      return next(new InternalServerError(COMMON_ERROR));
    }
  }
);

export default router;
