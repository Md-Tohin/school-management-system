import { request, response } from "express"
import CartProductModel from "../models/cartproduct.model.js"
import UserModel from "../models/user.model.js"

export const addToCartItemController = async(request, response) => {
    try {
        const userId = request.userId
        const { productId } = request.body

        if(!productId) {
            return response.status(400).json({
                message: "Provide productId",
                error: true,
                success: false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            productId: productId,
            userId: userId
        })

        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart",
                error: true,
                success: false
            })
        }

        const cartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })

        const save = await cartItem.save();

        const updateCartUser = await UserModel.updateOne({_id: userId}, {
            $push: {
                shopping_cart: productId
            }
        })

        return response.json({
            message: "Item added successfull",
            data: save,
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

export const getCartItemContorller = async(request, response) => {
    try {
        const userId = request.userId
        const cartItem = await CartProductModel.find({userId: userId}).populate('productId')

        return response.json({
            message: "get cart product",
            data: cartItem,
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

export const updateCartItemQtyController = async(request, response) => {
    try {
        const userId = request.userId
        const { _id, qty } = request.body;

        if(!_id || !qty){
            return response.status(500).json({
                message: "Provide _id, qty",
                error: true, 
                success: false
            })
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        }, {
            quantity: qty
        })

        return response.json({
            message: "Updated successfully!",
            data: updateCartItem,
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

export const deleteCartItemQtyController = async(request, response) => {
    try {
        const userId = request.userId;
        const { _id } = request.body

        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            })
        }        
        const deleteCartItem = await CartProductModel.deleteOne({_id: _id, userId: userId})
        return response.json({
            message: "Item removed",
            data: deleteCartItem,
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