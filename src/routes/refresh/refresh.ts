import { NextFunction, Response, Router } from 'express';
import { Unauthorized } from 'http-errors';

import {
  decodeRefresh,
  REFRESH_TOKEN_COOKIE_OPTS,
  signin,
} from '../../helpers/auth';
import { AUTH_UNAUTHORIZED } from '../../helpers/errors';
import prisma from '../../prisma';
import { RefreshRequest } from './schema';

const router = Router();

router.get(
  '/api/refresh',
  async (req: RefreshRequest, res: Response, next: NextFunction) => {
    const { refresh_token } = req.cookies;

    try {
      const decoded = decodeRefresh(refresh_token);

      if (!decoded) {
        throw new Error('Refresh token can’t be decoded');
      }

      const user = await prisma.user.findUnique({
        where: {
          userId: decoded.userId,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const { token, refreshToken } = await signin(user);

      res
        .cookie('refresh_token', refreshToken, REFRESH_TOKEN_COOKIE_OPTS)
        .json({ token });
    } catch (err) {
      return next(new Unauthorized(AUTH_UNAUTHORIZED));
    }
  }
);

export default router;
