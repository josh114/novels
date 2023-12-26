import { Router } from 'express';
import {
  createChapter,
  getChapter,
  getChapters,
  updateChapter,
  deleteChapter,
} from './chapter.js';
const chapterRouter = Router();

chapterRouter.route('/').post(createChapter);
chapterRouter
  .route('/:id')
  .get(getChapter)
  .patch(updateChapter)
  .delete(deleteChapter);
chapterRouter.route('/novel/:novel').get(getChapters);

export default chapterRouter;
