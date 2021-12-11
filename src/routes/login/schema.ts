import { check } from 'express-validator';

export interface LoginRequest extends Express.Request {
  body: {
    email: string;
    password: string;
  };
}

export const loginSchema = [
  check('email', 'Cette adresse email n’est pas valide')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Le mot de passe est obligatoire').notEmpty(),
];
