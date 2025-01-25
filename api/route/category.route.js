import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddCategoryContrller, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router()

categoryRouter.post("/add-category", auth, AddCategoryContrller)
categoryRouter.get("/get", getCategoryController)
categoryRouter.put("/update", auth, updateCategoryController)
categoryRouter.delete("/delete", auth, deleteCategoryController)


export default categoryRouter;

