import express from 'express';
import userSchema from '../schemas/users.js';
import validate from '../middlewares/validate.js';
import checkToken from '../middlewares/checkXToken.js';
import controller from '../controllers/userController.js'

const router = express.Router();

router.post('/register', validate(userSchema.register, 'body'), controller.register);
router.post('/login', validate(userSchema.login, 'body'), controller.login);
router.get('/list', checkToken, controller.getUsersList);
router.get('/profile/:id', checkToken, validate(userSchema.getProfile, 'params'), controller.getProfile);
router.put('/update', checkToken, validate(userSchema.updateProfile, 'body'), controller.updateProfile)
router.delete('/delete/:id', checkToken, validate(userSchema.deleteProfile, 'params'), controller.deleteProfile);


export default router;