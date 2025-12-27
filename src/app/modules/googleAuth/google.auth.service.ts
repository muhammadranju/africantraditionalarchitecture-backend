import { Secret, SignOptions } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { User } from '../user/user.model';
import { verifyGoogleToken } from '../../../util/google';

export class GoogleAuthService {
  async googleLogin(idToken: string) {
    const payload = await verifyGoogleToken(idToken);

    if (!payload?.email) {
      throw new Error('Invalid Google token');
    }

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      console.log('Creating user with payload:', {
        name: payload.name,
        email: payload.email,
        image: payload.picture,
        role: 'USER',
        provider: 'google',
      });

      try {
        user = await User.create({
          name: payload.name!,
          email: payload.email!,
          image: payload.picture!,
          role: 'USER',
          provider: 'google',
        });
        console.log('User is created:', user);
      } catch (err) {
        console.error('Failed to create user:', err);
        throw new Error('Failed to create user');
      }
    }

    let token;
    try {
      token = jwtHelper.createToken(
        { id: user._id.toString(), email: user.email },
        config.jwt.jwt_secret as Secret,
        config.jwt.jwt_expire_in as SignOptions['expiresIn']
      );
    } catch (err) {
      console.error('JWT creation error:', err);
      throw new Error('Failed to create JWT token');
    }

    return { token, user };
  }
}
