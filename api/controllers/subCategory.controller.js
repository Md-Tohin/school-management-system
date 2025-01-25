import ProductModel from "../models/product.model.js";
import SubCategoryModel from "../models/subCategory.model.js";

//  add category
export const addSubCategoryController = async(request, response) => {
    try {
        const { name, image, category } = request.body;
        if (!name && !image && !category[0]) {
            return response.status(400).json({
                message: "Provide name, image, category",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const createSubCategory = new SubCategoryModel(payload)

        const save = await createSubCategory.save();

        return response.json({
            message: "Sub Category added Successfully",
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

//  get subcategory
export const getSubCategoryController = async(request, response) => {
    try {
        // const data = await SubCategoryModel.find().sort({ createdAt : -1 }).populate('category');
        const data = await SubCategoryModel.find().populate('category');

        return response.json({
            message: "Sub category data",
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

//  update category
export const updateSubCategoryController = async(request, response) => {
    try {
        const {_id, name, image, category} = request.body;

        const checkSub = await SubCategoryModel.findById(_id);

        if (!checkSub) {
            return response.status(404).json({
                message: "Check your _id",
                error: true,
                success: false
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, { 
            name,
            image,
            category
         });

         return response.json({
            message: "Sub Category updated successfully",
            data: updateSubCategory,
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

//  delete category
export const deleteSubCategoryController = async(request, response) => {
    try {

        const {_id} = request.body;

        // const checkProoduct = await ProductModel.findById({
        //     subCategory : {
        //         "$in" : [_id]
        //     }
        // }).countDocuments();

        // if (checkProoduct > 0) {
        //     return response.status(400).json({
        //         message: "Sub Category is already use can't delete",
        //         error: true,
        //         success: false
        //     })
        // }

        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(_id);

        return response.json({
            message: "Sub Category deleted successfully",
            data: deleteSubCategory,
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
