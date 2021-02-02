const jwt = require('jsonwebtoken');

/** MODELS */
const User = require('../models/user');

//------------ROUTE FUNCTIONS--------------// 

function generateToken(req, res, next) {
  if (!req.user) return next();

  // Create token data
  const secret = process.env.TOKEN_SECRET;
  const jwtPayload = { user: req.user };
  const jwtData = { expiresIn: process.env.JWT_DURATION };
  
  // Generate and sign token
  req.access_token = jwt.sign(jwtPayload, secret, jwtData);
  next();
  }

function authenticateToken(req, res, next) {
  // Check for and get token from header
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'TokenMissing' });
  }
  const token = req.headers.authorization.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({error: err})
    else req.user = decoded.user
    next()
  })
}

function login(req, res, next) {
  // Grab login details
  const { username, password } = req.body;
  // Find and verify user
  User.findOne({ username })
    .then(user => {
      user.compareP

    })

}

function logout(req, res, next) {
  
}

function register(req, res, next) {

}

exports.authenticateToken = authenticateToken;
exports.generateToken = generateToken;
exports.login = login;
exports.logout = logout;
exports.register = register;