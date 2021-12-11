import bcrypt from 'bcrypt';
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

      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (err) {
      return next(new InternalServerError(COMMON_ERROR));
    }
  }
);

export default router;
