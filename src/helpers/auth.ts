import { User } from '@prisma/client';
import { addWeeks } from 'date-fns';
import jwt from 'jsonwebtoken';

const { APP_NAME, NODE_ENV, JWT_SECRET } = process.env;

export const TOKEN_EXPIRATION = '10m';
export const REFRESH_TOKEN_EXPIRATION = '1w';
export const REFRESH_TOKEN_COOKIE_OPTS = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  expires: addWeeks(new Date(), 1),
  sameSite: true,
};

export type DecodedTokenPayload = {
  userId: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};

export type DecodedRefreshToken = {
  userId: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};

export const decodeRefresh = (token: string): DecodedRefreshToken =>
  jwt.verify(token, JWT_SECRET) as DecodedRefreshToken;

export const signin = async (
  user: User
): Promise<{ token: string; refreshToken: string }> => {
  const { userId, firstName, lastName } = user;
  const payload = {
    userId,
    firstName,
    lastName,
  };
  const refreshPayload = {
    userId,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
    issuer: APP_NAME,
    audience: APP_NAME,
  });

  const refreshToken = jwt.sign(refreshPayload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
    issuer: APP_NAME,
    audience: APP_NAME,
  });

  return {
    token,
    refreshToken,
  };
};
