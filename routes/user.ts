import express from 'express';
import multer from 'multer';
const upload = multer({dest: 'temp/'});
const router = express.Router();

/** CONTROLLERS */
import { list, create, get, update, remove, load } from '../controllers/users';
import { authenticateToken } from '../controllers/auth';

//----------------------------ROUTES---------------------------------//

router.route('/')
  /** GET /api/user - Get list of users */
  .get(authenticateToken, list)

  /** POST /api/user - Create new user */
  .post(authenticateToken, create);

router.route('/:userId')
  /** GET /api/user/:userId - Get user */
  .get(authenticateToken, get)

  /** PUT /api/user/:userId - Update user */
  .put(authenticateToken, update)

  /** DELETE /api/user/:userId - Delete user */
  .delete(authenticateToken, remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', load);

module.exports = router;