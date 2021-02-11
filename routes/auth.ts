import express from 'express';
const router = express.Router();

/** CONTROLLERS */
import { login, register, logout } from '../controllers/auth';

/** MODELS */
import User from '../models/user';

/** CONFIGS */
const jwtConfig = {
	secret: process.env.TOKEN_SECRET,
	expiresIn: '2 days'
};

//----------------------------ROUTES---------------------------------//

router.route('/login')
  /** POST /api/login - Login user */
  .post(login);

router.route('/register')
  /** POST /api/register - Register user */
  .post(register);

router.route('/logout')
  /** POST /api/logout - Logout user */
  .post(logout);

module.exports = router;