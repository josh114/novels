import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from './user.js';
const userRouter = Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route('/:id').get(getUser)
export default userRouter;
