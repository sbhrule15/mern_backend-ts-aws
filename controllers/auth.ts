import jwt from 'jsonwebtoken';
import { RequestHandler, Request, Response, NextFunction } from 'express';

/** MODELS */
import User from '../models/user';

//------------ROUTE FUNCTIONS--------------// 

export function generateToken(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return next();

  // Create token data
  const secret = process.env.TOKEN_SECRET as string;
  const jwtPayload = { user: req.user };
  const jwtData = { expiresIn: process.env.JWT_DURATION as string };
  
  // Generate and sign token
  req.access_token = jwt.sign(jwtPayload, secret, jwtData);
  next();
  }

export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  // Check for and get token from header
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  const token: string = req.headers.authorization.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded) => {
    if (err) return res.status(403).send({error: err})
    else req.user = decoded.user
    next()
  })
}

export function login(req: any, res: Response, next: NextFunction) {
  // Grab login details
  const { username, password } = req.body;
  // Find and verify user
  User.findOne({ username })
    .then(user => {
      user.compareP

    })

}

export function logout(req: any, res: Response, next: NextFunction) {
  
}

export function register(req: any, res: Response, next: NextFunction) {

}

// module.exports.authenticateToken = authenticateToken;
// module.exports.generateToken = generateToken;
// module.exports.login = login;
// module.exports.logout = logout;
// module.exports.register = register;