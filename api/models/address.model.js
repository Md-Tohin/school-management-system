import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        default: ""
    },
    post_code: {
        type: String,
        default: ""
    },
    sub_district: {
        type: String,
        default: ""
    },
    district: {
        type: String,
        default: ""
    },
    division: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: ""
    }
}, {
    timestamps: true
}) 

const AddressModel = mongoose.model('address', addressSchema)

export default AddressModel;