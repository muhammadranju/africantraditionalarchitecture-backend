import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // We don't need to do much here, we'll handle the login in the controller
        // but passport requires we call done
        return done(null, profile);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

// Passport serialize/deserialize are required for sessions,
// but since we are using JWT we can just provide dummy ones if needed
// or just not use them if we use session: false in the route.
passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;
