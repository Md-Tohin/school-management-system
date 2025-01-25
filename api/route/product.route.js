import { Router } from "express";
import auth from "../middleware/auth.js";
import { createProductController, deleteProduct, getProductByCategory, getProductByCategoryAndSubCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/create', auth, createProductController);
productRouter.post('/get', getProductController)
productRouter.post('/get-product-by-category', getProductByCategory)
productRouter.post('/get-product-by-category-and-subcategory', getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details', getProductDetails)
productRouter.put('/update-product-details', auth, updateProductDetails)
productRouter.delete('/delete-product', auth, deleteProduct)
productRouter.post('/search-product', searchProduct)

export default productRouter;