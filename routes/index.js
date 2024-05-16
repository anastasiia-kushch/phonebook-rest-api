import express from 'express';
import contactsRouter from './contactsRouter.js';
import authRouter from './authRouter.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();
router.use('/contacts', checkAuth, contactsRouter);
router.use('/users', authRouter);

export default router;
