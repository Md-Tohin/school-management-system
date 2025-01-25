import { useEffect, useState } from "react"
import { useGlobalContext } from "../provider/GlobalProvider"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import Loading from "./Loading"
import { useSelector } from "react-redux"
import { FaMinus, FaPlus } from "react-icons/fa6"


const AddToCartButton = ({data}) => {
    const [loading, setLoading] = useState(false)
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const cartItem = useSelector(state => state?.cartItem?.cart);
    const [isAvailable, setIsAvailable] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState();

    const handleAddToCart = async(e) => {
        e.preventDefault()
        e.stopPropagation();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchCartItem) {
                    fetchCartItem()
                }             
            }
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const checkingItem = cartItem.some(item => item.productId?._id === data?._id)
        setIsAvailable(checkingItem)
        const product = cartItem.find(item => item.productId?._id === data?._id)        
        setQty(product?.quantity)
        setCartItemDetails(product);
    }, [data, cartItem])

    const increaseQty = async(e) => {
        e.preventDefault();
        e.stopPropagation();

        const response = await updateCartItem(cartItemDetails?._id, qty+1)
        
        if(response.success) {
            toast.success("Item added")
        }
    }

    const decreaseQty = async(e) => {
        e.preventDefault();
        e.stopPropagation();
        if(qty === 1){
            deleteCartItem(cartItemDetails?._id);
            return;
        }
        else{
            const response = await updateCartItem(cartItemDetails?._id, qty-1)
            
            if(response.success) {
                toast.success("Item removed")
            }
        }
    }

  return (
    <div >
        {
            isAvailable ? (
                <div className="flex">
                    <button className="bg-green-600 hover:bg-green-700 text-white rounded px-1" onClick={decreaseQty}><FaMinus /></button>
                    <p className="px-1 font-semibold">{qty}</p>
                    <button className="bg-green-600 hover:bg-green-700 text-white rounded px-1" onClick={increaseQty}><FaPlus /></button>
                </div>
            ) : (
                <div onClick={handleAddToCart} className="w-fit bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded">            
                    <button className="">
                        {
                            loading ? <Loading /> : "Add"
                        }
                    </button>
                </div>
            )
        }
        
    </div>
  )
}

export default AddToCartButton
