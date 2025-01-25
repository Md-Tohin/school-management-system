import { request, response } from "express";
import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";


export const addAddressController = async(request, response) => {
    try {
        const userId = request.userId
        const { address_line, post_code, sub_district, district, division, country, mobile } = request.body;

        const createAddress = new AddressModel({
            address_line, 
            post_code,
            sub_district,
            district,
            division,
            country,
            mobile,
            userId
        })

        const saveAddress = await createAddress.save();

        if (saveAddress) {
            const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
                $push: {
                    address_details: saveAddress._id
                }
            })  
        }        

        return response.json({
            message: "Address created successfully", 
            data: saveAddress,
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

export const getAddressController = async(request, response) => {
    try {
        const userId = request.userId

        const data = await AddressModel.find({userId: userId}).sort({createdAt: -1})

        return response.json({
            message: "List of address",
            data: data,
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

export const updateAddressController = async(request, response) => {
    try {
        const userId = request.userId
        const { _id, address_line, post_code, sub_district, district, division, country, mobile } = request.body;

        if(!_id) {
            return response.status(400).json({
                message: "Provide address _id ",
                error: true, 
                success: false
            })
        }

        const updateAddress = await AddressModel.updateOne({_id: _id, userId: userId}, {
            address_line: address_line, 
            post_code: post_code,
            sub_district: sub_district,
            district: district,
            division: division,
            country: country,
            mobile: mobile,
            userId: userId
        })

        return response.json({
            message: "Address updated successfully!",
            data: updateAddress,
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

export const deleteAddressController = async(request, response) => {
    try {
       const userId = request.userId
       const {_id} = request.body      
       
       const disableAddress = await AddressModel.updateOne({_id: _id, userId: userId}, {
        status: false
       })

       return response.json({
        message: "Address remove",
        data: disableAddress,
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