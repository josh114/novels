import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import corsOptions from './config/corsOptions.js';
import userRouter from './src/user/userRoutes.js';
import authRouter from './src/auth/authRoutes.js';
import novelRouter from './src/novel/novelRouter.js';
import uploadRouter from './src/upload/uploadRouter.js';
import chapterRouter from './src/novel/chapterRouter.js';
import updatesRouter from './src/updates/updatesRouter.js';

const app = express();
app.use(cors(corsOptions));
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
app.use('/upload', uploadRouter);
app.use('/chapter', chapterRouter);
app.use('/updates', updatesRouter);

export default app;
