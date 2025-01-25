import { Router } from "express";
import auth from "../middleware/auth.js";
import { getSubCategoryController } from "../controllers/subCategory.controller.js";

const subCatRouter = Router();

subCatRouter.post("/get", getSubCategoryController);

export default subCatRouter;