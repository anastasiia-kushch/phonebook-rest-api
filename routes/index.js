import express from 'express';
import contactsRouter from './contactsRouter.js';
import userRouter from './userRouter.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();
router.use('/contacts', checkAuth, contactsRouter);
router.use('/users', userRouter);

export default router;
