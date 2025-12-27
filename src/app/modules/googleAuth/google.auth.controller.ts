import { Request, Response } from 'express';
import { GoogleAuthService } from './google.auth.service';

const authService = new GoogleAuthService();

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: 'ID token required' });
    }
    const data = await authService.googleLogin(idToken);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: 'Google authentication failed' });
  }
};
