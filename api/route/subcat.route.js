import { Router } from "express";
import auth from "../middleware/auth.js";
import { addSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js";

const subCatRouter = Router();

subCatRouter.post("/get", getSubCategoryController);
subCatRouter.post("/create", auth, addSubCategoryController);
subCatRouter.put("/update", auth, updateSubCategoryController);
subCatRouter.delete("/delete", auth, deleteSubCategoryController);


export default subCatRouter;