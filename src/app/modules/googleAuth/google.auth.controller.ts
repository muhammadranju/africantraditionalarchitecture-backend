import { Request, Response } from 'express';
import { googleAuthService } from './google.auth.service';

export const googleAuthController = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body; // ⚠️ This is AUTH CODE

    if (!idToken) {
      return res.status(400).json({ message: 'Authorization code missing' });
    }

    const data = await googleAuthService(idToken);

    return res.status(200).json(data);
  } catch (error) {
    console.error('Google Auth Error:', error);
    return res.status(500).json({ message: 'Google authentication failed' });
  }
};
