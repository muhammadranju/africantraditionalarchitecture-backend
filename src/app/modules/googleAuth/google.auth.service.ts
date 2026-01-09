import axios from 'axios';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../user/user.model';
import { jwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthService = async (code: string) => {
  // 1️⃣ Exchange AUTH CODE → TOKENS
  const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: 'postmessage',
    grant_type: 'authorization_code',
  });

  const { id_token } = tokenRes.data;

  if (!id_token) {
    throw new Error('ID token not received from Google');
  }

  // 2️⃣ Verify ID TOKEN
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new Error('Invalid Google token');
  }
  console.log(payload);

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    try {
      user = await User.create({
        name: payload.name!,
        email: payload.email!,
        role: 'USER',
        provider: 'google',
      });
    } catch (err) {
      console.error('Failed to create user:', err);
      throw new Error('Failed to create user');
    }
  }

  let token;
  try {
    token = jwtHelper.createToken(
      { id: user._id.toString(), email: user.email, role: user.role },
      config.jwt.jwt_secret as Secret,
      config.jwt.jwt_expire_in as SignOptions['expiresIn']
    );
  } catch (err) {
    console.error('JWT creation error:', err);
    throw new Error('Failed to create JWT token');
  }

  return { token, user };
};
