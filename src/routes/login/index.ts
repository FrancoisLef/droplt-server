import bcrypt from 'bcrypt';
import { NextFunction, Response, Router } from 'express';
import { InternalServerError, NotFound } from 'http-errors';
import jwt from 'jsonwebtoken';

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
          email: email.toLowerCase(),
        },
      });

      if (!user) {
        return next(new NotFound('Cette adresse email n’existe pas'));
      }

      const isMatch = await bcrypt.compare(user.password, password);

      if (!isMatch) {
        return next(new NotFound('Le mot de passe est incorrect'));
      }

      const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET);

      res.json({ token });
    } catch (err) {
      return next(new InternalServerError('Un problème est survenu'));
    }
  }
);

export default router;
