import { Router } from 'express';
import {
  createChapter,
  getChapter,
  getChapters,
  updateChapter,
  deleteChapter,
} from './chapter';
import cache from 'express-redis-cache';

const chapterRouter = Router();

chapterRouter.route('/').post(createChapter);
chapterRouter
  .route('/:id')
  .get(cache.route({ expires: 5000 }), getChapter)
  .patch(updateChapter)
  .delete(deleteChapter);
chapterRouter.route('/:novel').get(cache.route({ expires: 5000 }), getChapters);

export default chapterRouter;
