import { Router } from "express";
import { getCategoryController } from "../controllers/category.controller.js";

const categoryRouter = Router()

// categoryRouter.post("/add-category", AddCategoryContrller)
categoryRouter.get("/get", getCategoryController)
// categoryRouter.put("/update", updateCategoryController)
// categoryRouter.delete("/delete", deleteCategoryController)

export default categoryRouter;