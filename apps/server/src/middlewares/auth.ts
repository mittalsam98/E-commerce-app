import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { INVALID_REQUEST, JWTPayload } from 'shared-types';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      let token = authHeader.split(' ')[1];
      const decoded: JWTPayload = jwt.verify(token, process.env.SECRET || 'secret') as JWTPayload;
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error_code: INVALID_REQUEST, message: 'Unauthorized, token failed' });
    }
  } else {
    return res
      .status(401)
      .json({ error_code: INVALID_REQUEST, message: 'Unauthorized, token failed' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({
        error_code: INVALID_REQUEST,
        message: 'You are not authorized to perform this action'
      });
    }
  } else {
    return res
      .status(401)
      .json({ error_code: INVALID_REQUEST, message: 'Unauthorized, user does not exits' });
  }
};
