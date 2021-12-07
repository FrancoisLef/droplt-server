import { NextFunction, Request, Response } from 'express';
import { check, ValidationChain, validationResult } from 'express-validator';

export const loginSchema = [
  check('email', 'Cette adresse email n’est pas valide')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Le mot de passe est obligatoire').isString().notEmpty(),
];

/**
 * Validate middleware
 *
 * @param validations
 * @returns
 */
const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  };
};

export default validate;
