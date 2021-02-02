import express from 'express';
import multer from 'multer';
const upload = multer({dest: 'temp/'});
const router = express.Router();

/** CONTROLLERS */
import userCtrl from '../controllers/users';
import authCtrl from '../controllers/auth';
import packCtrl from '../controllers/packs';

//----------------------------ROUTES---------------------------------//

router.route('/')
  /** GET /api/user - Get list of users */
  .get(userCtrl.list)

  /** POST /api/user - Create new user */
  .post(userCtrl.create);

router.route('/:userId')
  /** GET /api/user/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/user/:userId - Update user */
  .put(userCtrl.update)

  /** DELETE /api/user/:userId - Delete user */
  .delete(userCtrl.remove);

router.route('/:userId/pack')
  /** GET /api/user/:userId/pack - Get list of packs created by user */
  .get(
    authCtrl.authenticateToken,
    packCtrl.list)

  /** POST /api/user/:userId/pack - Create new pack for user */
  .post(    
    upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'preview', maxCount: 1 }
  ]),
  authCtrl.authenticateToken,
  packCtrl.create);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;