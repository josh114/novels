import { createCategory, uploads } from "./category.js";
import { Router } from "express";

const categoryRouter = Router()

categoryRouter.route('/').post(uploads, createCategory)

export default categoryRouter;