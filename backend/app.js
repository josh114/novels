import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import corsOptions from './config/corsOptions.js';
import userRouter from './src/user/userRoutes.js';
import authRouter from './src/auth/authRoutes.js';
import novelRouter from './src/novel/novelRouter.js';
const app = express();
app.use(cors());
app.use(logger);
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use('/files', express.static('files'));

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/novel', novelRouter);

export default app;
