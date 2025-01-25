import { FaCartShopping } from "react-icons/fa6";
import { useGlobalContext } from "../provider/GlobalProvider";
import { displayPriceInRupees } from "../utils/DisplayPriceRupees";
import { Link } from "react-router-dom";

const CartMobile = () => {
  const { totalQty, totalPrice } = useGlobalContext();

  return (
    <div className="fixed lg:hidden bottom-16 right-4">
      <div
        to={"/cart"}
        className="bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm w-fit"
      >
        <Link to={"/cart"}>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500 rounded w-fit">
              <FaCartShopping />
            </div>
            <div className="text-xs">
              <p>{totalQty} items</p>
              <p>{displayPriceInRupees(totalPrice)}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartMobile;
