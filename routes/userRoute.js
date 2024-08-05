import express from 'express';
import userController from '../controllers/userController.js';
import checkXToken from "../middlewares/checkXToken.js";

const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login);
router.get('/profile', checkXToken, userController.getUserProfile);


export default router;