import Router from 'express';
import { getUpdates } from './updates';
const updatesRouter = Router();

updatesRouter.route('/').get(getUpdates)

export default updatesRouter;