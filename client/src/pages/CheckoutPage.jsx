import { useEffect, useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { displayPriceInRupees } from "../utils/DisplayPriceRupees";
import AddAddress from "../components/AddAddress";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false)
  const { notDiscountTotalPrice, totalQty, totalPrice, fetchCartItem, fetchOrder } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state?.addresses?.addressList)
  const cartItemsList = useSelector(state => state?.cartItem?.cart)
  const [selectAddress, setSelectAddress ] = useState(0)
  const navigate = useNavigate()
  
  const handleCashOnDeliveryOrder = async() => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.cashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          totalAmt: notDiscountTotalPrice,
          subTotalAmt: totalPrice
        }
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) {
          fetchCartItem()
        }
        if(fetchOrder) {
          fetchOrder()
        }
        navigate('/success', {
          state: {
            text: "Order"
          }
        })
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-between gap-5 ">
        {/* address */}
        <div className="w-full">
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-4">
            {
              addressList.map((address, index) => {
                return (
                  <label key={address?._id + "address" + index} htmlFor={`address-${index}`} className={`${!address?.status && "hidden"}`}>
                    <div className="border rounded p-3 flex gap-3 items-center hover:bg-blue-50">
                      <div>
                        <input id={`address-${index}`} value={index} onClick={(e) => setSelectAddress(e.target.value)} type="radio" name="address"  />
                      </div>
                      <div>
                          <p>{address?.address_line}</p>
                          <p>Post code: {address?.post_code}</p>
                          <p>{address?.sub_district}, {address?.district}</p>
                          <p>{address?.division}, {address?.country}</p>
                          <p>{address?.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className="cursor-pointer h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center">
              Add address
            </div>
          </div>
          
        </div>
        {/* summary */}
        <div className="w-full max-w-md bg-white py-4 px-2">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex justify-between gap-4 ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400 text-sm">
                  {displayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{displayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex justify-between gap-4 ml-1">
              <p>Quantity total</p>
              <p>
                <span>{totalQty} items</span>
              </p>
            </div>
            <div className="flex justify-between gap-4 ml-1">
              <p>Delivery Charge</p>
              <p>
                <span>Free</span>
              </p>
            </div>
            <div className="flex justify-between gap-2 font-semibold">
              <p>Grand total</p>
              <p>{displayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold">Online Payment</button>
            <button onClick={handleCashOnDeliveryOrder} className="py-2 px-4 border-2 border-green-600 hover:bg-green-600 hover:text-white text-green-600 font-semibold rounded">Cash on Delivery</button>
          </div>
        </div>

      </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
  );
};

export default CheckoutPage;
