import mongoose from "mongoose"
import OrderModel from "../models/order.model.js"
import e from "express"
import CartProductModel from "../models/cartproduct.model.js"
import UserModel from "../models/user.model.js"

export async function CashOnDeliveryOrderController (request, response) {
    try {

        const userId = request.userId  // auth middleware

        const { list_items, addressId, totalAmt, subTotalAmt } = request.body

        // console.log('list_items', list_items);
        // console.log('addressId', addressId);
        // console.log('totalAmt', totalAmt);
        // console.log('subTotalAmt', subTotalAmt);

        const payload = list_items.map(el => {
            return ({
                userId: userId,
                orderId: `ORD-${new mongoose.Types.ObjectId()}`,
                orderDate: new Date(),
                productId: el.productId?._id,
                product_details: {
                    name: el.productId.name,
                    image: el.productId.image,
                    price: el.productId.price,
                    discount: el.productId.discount,
                    unit: el.productId.unit,
                },
                paymentId: "",
                payment_status: "CASH ON DELIVERY",
                order_status: "Pending",
                delivery_address: addressId,
                subTotalAmt: subTotalAmt,
                totalAmt: totalAmt,
                invoice_receipt: "" 
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        //  remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({userId: userId})
        const updateUser = await UserModel.updateOne({_id: userId}, {
            shopping_cart: []
        })

        return response.json({
            message: "Order successfully",
            data: generatedOrder,
            error: false,
            success: true
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function getOrderDetailsController(request, response) {
    try {
        const userId = request.userId // auth middleware
        const user = await UserModel.findById(userId)
        let orderList = [];
        if (user.role === "ADMIN") {
            orderList = await OrderModel.find().sort({createdAt : - 1}).populate('delivery_address userId')
        } else {
            orderList = await OrderModel.find({userId: userId}).sort({createdAt : - 1}).populate('delivery_address userId')
        }        
        return response.json({
            message: "Order list",
            data: orderList,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message|| error,
            error: true,
            success: false
        })
    }
}

export async function updateOrderDeliveryStatusController(request, response) {
    try {
        const userId = request.userId // auth middleware
        const {_id, order_status } = request.body;

        const data = await OrderModel.updateOne({
            _id: _id
        }, {
            order_status: order_status,
        });        
        return response.json({
            message: "Delivery status Updated",
            data: data,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message|| error,
            error: true,
            success: false
        })
    }    
}