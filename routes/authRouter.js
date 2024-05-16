import express from 'express';
import { register, login } from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../schemas/usersSchema.js';

const authRouter = express.Router();
authRouter.post('/register', validateBody(registerUserSchema), register);
authRouter.post('/login', validateBody(loginUserSchema), login);

export default authRouter;
