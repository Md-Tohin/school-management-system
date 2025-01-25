import { Router } from "express";
import auth from "../middleware/auth.js";
import { CashOnDeliveryOrderController, getOrderDetailsController, updateOrderDeliveryStatusController } from "../controllers/order.controller.js";

const orderRouter = Router()

orderRouter.post('/cash-on-delivery', auth, CashOnDeliveryOrderController)
orderRouter.get('/order-list', auth, getOrderDetailsController)
orderRouter.post('/order-status-update', auth, updateOrderDeliveryStatusController)

export default orderRouter