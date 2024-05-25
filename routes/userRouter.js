import express from 'express';
import {
  register,
  login,
  logout,
  currentUser,
  updateSubscription,
  verifyEmail,
  resendVerifyEmail,
} from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  subscriptionUserSchema,
  resendVerifySchema,
} from '../schemas/usersSchema.js';
import { checkAuth } from '../middlewares/checkAuth.js';
import { uploadAvatar } from '../controllers/usersControllers.js';
import uploadMiddleware from '../middlewares/upload.js';

const userRouter = express.Router();
userRouter.post('/register', validateBody(registerUserSchema), register);
userRouter.post('/login', validateBody(loginUserSchema), login);
userRouter.get('/logout', checkAuth, logout);
userRouter.get('/current', checkAuth, currentUser);
userRouter.patch(
  '/subscription',
  checkAuth,
  validateBody(subscriptionUserSchema),
  updateSubscription
);
userRouter.patch(
  '/avatars',
  checkAuth,
  uploadMiddleware.single('avatar'),
  uploadAvatar
);
userRouter.get('/verify/:verificationToken', verifyEmail);
userRouter.post('/verify', validateBody(resendVerifySchema), resendVerifyEmail);

export default userRouter;
