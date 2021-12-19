import { body } from 'express-validator';

export interface LoginRequest extends Express.Request {
  body: {
    email: string;
    password: string;
  };
}

export const loginSchema = [
  body('email', 'Cette adresse email n’est pas valide')
    .isEmail()
    .normalizeEmail(),
  body('password', 'Le mot de passe est obligatoire').notEmpty(),
];
