import { JwtPayload } from 'jsonwebtoken';

export type TUser = {
  id: string;
  role: string;
  email: string;
} & JwtPayload;

declare global {
  namespace Express {
    interface User extends TUser {}
    interface Request {
      user?: User;
    }
  }
}
