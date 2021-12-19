import { NextFunction, Response, Router } from 'express';
import { Unauthorized } from 'http-errors';

import { AUTH_UNAUTHORIZED } from '../../helpers/errors';
import { RefreshRequest } from './schema';

const router = Router();

router.get(
  '/refresh',
  async (req: RefreshRequest, res: Response, next: NextFunction) => {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      return next(new Unauthorized(AUTH_UNAUTHORIZED));
    }

    console.log(JSON.stringify(refresh_token, null, 2));

    res.send('OK');
  }
);

export default router;
