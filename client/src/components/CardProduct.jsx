
import { Link } from "react-router-dom"
import productImage from "../assets/images/product/96024aee-b3dc-429f-929a-c5e0665c8594.jpg"
import { displayPriceInRupees, displayPriceInTaka } from "../utils/DisplayPriceRupees"
import { valideURLconvert } from "../utils/valideURLConvert"
import { priceWithDiscount } from "../utils/PriceWithDiscount"
import AddToCartButton from "./AddToCartButton"


const CardProduct = ({data}) => {
    const url = `/product/${valideURLconvert(data.name)}-${data._id}`;

  return (
    <Link to={url} className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:max-w-36 lg:min-w-52 rounded bg-white">
        <div className="min-h-20 max-h-24 w-full lg:max-h-32 rounded overflow-hidden relative"> {/* data.image[0] : productImage */}
            <img src={data.image[0]} alt="image" className="w-full h-full object-scale-down lg:scale-125" />
            {
                Boolean(data.discount) && (
                    <div className="absolute top-0 right-0 text-green-600 bg-green-200 w-fit px-2  rounded-full text-sm font-medium">{data.discount}%</div>
                )
            } 
        </div>
        <div className="rounded mt-1 text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50">
            10 min
        </div>        
        <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
            { data.name }
        </div>
        <div className="w-fit px-2 lg:px-0 text-sm lg:text-base">
            { data.unit}
        </div>
        <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
            <div className="font-semibold">
                {displayPriceInTaka(priceWithDiscount(data.price, data.discount))}
            </div>
            {
                data.stock == 0 ? 
                    <p className="text-red-600 lg:text-sm text-xs text-right">Out of stock</p> 
                : (
                    <AddToCartButton data={data} />
                )
            }
                        
        </div>
    </Link>
  )
}

export default CardProduct
