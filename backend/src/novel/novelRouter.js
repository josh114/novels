import {
  createNovel,
  deleteNovel,
  getNovel,
  getNovels,
  updateNovel,
  updateNovelImage,
  uploads,
} from './novel.js';
import { Router } from 'express';

const novelRouter = Router();

novelRouter.route('/').post(createNovel).get(getNovels);
novelRouter.route('/:id').get(getNovel).patch(updateNovel).delete(deleteNovel);
novelRouter.route('/image/:id').patch(uploads, updateNovelImage);

export default novelRouter;
