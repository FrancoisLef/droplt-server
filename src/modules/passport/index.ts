import bcrypt from 'bcrypt';
import passport from 'passport';
// import passportJwt from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import prisma from '../prisma';

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) {
          return done(undefined, false, {
            message: `Email address ${email} not found.`,
          });
        }

        const isMatch = await bcrypt.compare(user.password, password);

        if (!isMatch) {
          return done(undefined, false, {
            message: 'Invalid email address or password.',
          });
        }

        return done(undefined, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export default passport;
