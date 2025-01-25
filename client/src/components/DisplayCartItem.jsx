import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { displayPriceInRupees } from "../utils/DisplayPriceRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import cartEmptyImage from "../assets/empty_cart.webp"
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalQty, totalPrice } = useGlobalContext();
  const cartItem = useSelector(state => state?.cartItem?.cart)
  const user = useSelector(state => state?.user)
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {    
    if (close) {
      close()
    }
    if (user?._id) {     
      navigate("/checkout")      
      return ;
    }      
    toast.error("Please login")
  }

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex justify-between items-center gap-3 p-4 shadow-md">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} />
          </button>
        </div>

        {/* display item */}
        <div className="min-h-[70vh] lg:min-h-[75vh] h-full max-h-[calc(100vh - 150px)]  bg-blue-50 p-2 flex flex-col gap-4">
          {
            cartItem[0] ? (
              <>
                <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full ">
                  <p>Your total savings</p>
                  <p>{displayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                </div>
                <div className="bg-white rounded-lg p-2 grid gap-5 overflow-auto max-h-[40vh]">
                  {
                    cartItem[0] && (
                      cartItem.map((item, index) => {
                        return (
                          <div key={"cartItem"+index} className="flex gap-2 w-full">
                            <div className="w-16 h-16 min-w-16 min-h-16  border rounded">
                              <img src={item?.productId?.image[0]} alt="image" className="object-scale-down h-full w-full rounded" />
                            </div>
                            <div className="w-full max-w-sm text-xs">
                              <p className="text-xs text-ellipsis line-clamp-2">{item?.productId?.name}</p>
                              <p className="text-neutral-400">{item?.productId?.unit}</p>
                              <p className="font-semibold">{displayPriceInRupees(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                            </div>
                            <div>
                              <AddToCartButton data={item?.productId} />
                            </div>
                          </div>
                        )
                      })
                    )
                  }
                </div>

                <div className="bg-white p-4">
                  <h3 className="font-semibold">Bill details</h3>
                  <div className="flex justify-between gap-4 ml-1">
                    <p>Items total</p>
                    <p className="flex items-center gap-2"><span className="line-through text-neutral-400 text-sm">{displayPriceInRupees(notDiscountTotalPrice)}</span><span>{displayPriceInRupees(totalPrice)}</span></p>
                  </div>
                  <div className="flex justify-between gap-4 ml-1">
                    <p>Quantity total</p>
                    <p ><span>{totalQty} items</span></p>
                  </div>
                  <div className="flex justify-between gap-4 ml-1">
                    <p>Delivery Charge</p>
                    <p ><span>Free</span></p>
                  </div>
                  <div className="flex justify-between gap-2 font-semibold">
                    <p>Grand total</p>
                    <p>{ displayPriceInRupees(totalPrice) }</p>
                  </div>

                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center bg-white">
                <img src={cartEmptyImage} alt="Cart is empty" className="w-full h-full object-scale-down" />
                <Link className="bg-green-600 px-4 py-2 rounded text-white mb-2" onClick={close} to={'/'}>Shop Now</Link>
              </div>
            )
          }
        </div>

        {
          cartItem[0] && (
            <div className="p-2">
              <div className="bg-green-700 text-neutral-100 px-4 py-4 font-bold text-base static bottom-5 rounded flex items-center gap-4 justify-between">
                <div>{displayPriceInRupees(totalPrice)}</div>
                <button onClick={redirectToCheckoutPage} className="flex items-center gap-1">
                  Proceed
                  <span><FaCaretRight /> </span>
                </button>
              </div>
            </div>
          )
        }

      </div>
    </section>
  );
};

export default DisplayCartItem;
