import {
  createNovel,
  deleteNovel,
  getNovel,
  getNovels,
  updateNovel,
} from './novel.js';
import { Router } from 'express';

const novelRouter = Router();

novelRouter.route('/').post(createNovel).get(getNovels);
novelRouter.route('/:id').get(getNovel).patch(updateNovel).delete(deleteNovel);

export default novelRouter;
