export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login: {
        url: '/api/user/login',
        method : 'post'
    }, 
    logout: {
        url: '/api/user/logout',
        method : 'get'
    }, 
    forgot_password: {
        url: '/api/user/forgot-password',
        method: 'put'
    }, 
    forgot_password_otp: {
        url: '/api/user/verify-forgot-password-otp',
        method: 'put'
    },
    resetPassword: {
        url: '/api/user/reset-password',
        method: 'put'
    },
    refreshToken: {
        url: '/api/user/refresh-token',
        method: 'post'
    },
    userDetails: {
        url: '/api/user/user-details',
        method: 'get'
    },
    uploadAvatar: {
        url: '/api/user/upload-avater',
        method: 'put'
    },
    updateUserDetails: {
        url: '/api/user/update-user',
        method: 'put',
    },    
    uploadImage: {
        url: '/api/file/upload',
        method: 'post'
    },
    // category
    addCategory: {
        url: '/api/category/add-category',
        method: 'post'
    },
    getCategory: {
        url: '/api/category/get',
        method: 'get'
    },
    updateCategory: {
        url: '/api/category/update',
        method: 'put'
    },
    deleteCategory: {
        url: '/api/category/delete',
        method: 'delete'
    },
    // subcategory
    createSubCategory: {
        url: '/api/subcat/create',
        method: 'post'
    },
    getSubCategory: {
        url: '/api/subcat/get',
        method: 'post'
    },
    updateSubCategory: {
        url: '/api/subcat/update',
        method: 'put'
    },
    deleteSubCategory: {
        url: '/api/subcat/delete',
        method: 'delete'
    },
    // product
    createProduct: {
        url: '/api/product/create',
        method: 'post'
    },
    getProduct: {
        url: '/api/product/get',
        method: 'post'
    },
    getProductByCategory: {
        url: '/api/product/get-product-by-category',
        method: 'post'
    },
    getProductByCategoryAndSubCategory: {
        url: '/api/product/get-product-by-category-and-subcategory',
        method: 'post'
    },
    getProductDetails: {
        url: '/api/product/get-product-details',
        method: 'post'
    },
    updateProductDetails: {
        url: '/api/product/update-product-details',
        method: 'put'
    },
    deleteProduct: {
        url: '/api/product/delete-product',
        method: 'delete'
    },
    searchProduct: {
        url: '/api/product/search-product',
        method: 'post'
    },
    addToCart: {
        url: '/api/cart/create',
        method: 'post'
    },
    getCartItem: {
        url: '/api/cart/get',
        method: 'get'
    },
    updateCartItem: {
        url: '/api/cart/update-qty',
        method: 'put'
    },
    deleteCartItem: {
        url: '/api/cart/delete-cart-item',
        method: 'delete'
    },
    createAddress: {
        url: '/api/address/create', 
        method: 'post'
    },
    getAddress: {
        url: '/api/address/get', 
        method: 'get'
    },
    updateAddress: {
        url: '/api/address/update', 
        method: 'put'
    },
    disableAddress: {
        url: '/api/address/disable', 
        method: 'delete'
    },
    cashOnDeliveryOrder: {
        url: '/api/order/cash-on-delivery',
        method: 'post'
    },
    getOrderItems: {
        url: '/api/order/order-list',
        method: 'get'
    },
    updateOrderDeliveryStatus: {
        url: '/api/order/order-status-update',
        method: 'post'
    }
}

export default SummaryApi