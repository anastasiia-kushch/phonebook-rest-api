import express from 'express';
import { register, login, logout, currentUser, updateSubscription } from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../schemas/usersSchema.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { uploadAvatar } from '../controllers/usersControllers.js';
import uploadMiddleware from '../middlewares/upload.js';

const authRouter = express.Router();
authRouter.post('/register', validateBody(registerUserSchema), register);
authRouter.post('/login', validateBody(loginUserSchema), login);
authRouter.get('/logout', checkAuth, logout)
authRouter.get('/current', checkAuth, currentUser)
authRouter.patch('/', checkAuth, updateSubscription)
authRouter.patch('/avatars', checkAuth, uploadMiddleware.single("avatar"), uploadAvatar)

export default authRouter;
