const express = require ('express');
const router = express.Router();

/** CONTROLLERS */
const authCtrl = require('../controllers/auth');

/** MODELS */
const User = require('../models/user');

/** CONFIGS */
const jwtConfig = {
	secret: process.env.TOKEN_SECRET,
	expiresIn: '2 days'
};

//----------------------------ROUTES---------------------------------//

router.route('/login')
  /** POST /api/login - Login user */
  .post(authCtrl.login);

router.route('/register')
  /** POST /api/register - Register user */
  .post(authCtrl.register);

router.route('/logout')
  /** POST /api/logout - Logout user */
  .post(authCtrl.logout);

module.exports = router;