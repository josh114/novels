import { Router } from 'express';
import { login } from './auth.js';

const authRouter = Router();

authRouter.route('/').post(login);

export default authRouter