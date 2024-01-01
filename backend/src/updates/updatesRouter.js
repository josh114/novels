import Router from 'express';
import { getUpdates } from './updates.js';
const updatesRouter = Router();

updatesRouter.route('/').get(getUpdates);

export default updatesRouter;
