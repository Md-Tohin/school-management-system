import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import { useEffect, useRef, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { displayPriceInRupees, displayPriceInTaka } from "../utils/DisplayPriceRupees";
import Divider from "../components/Divider";
import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const imageContainer = useRef();

  const params = useParams();

  const productId = params.product.split("-").slice(-1)[0];

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        console.log(responseData.data);
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params, productId]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
    console.log("test ");
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
      <div className="">
        <div className="bg-white rounded min-h-56 max-h-56 h-full w-full lg:min-h-[60vh] lg:max-h-[60vh]">
          <img
            src={data.image[image]}
            alt="image"
            className="w-full h-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, index) => {
            return (
              <div
                key={"image" + index}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-4 relative z-10 overflow-x-scroll scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  key={index + "image"}
                  className="w-20 h-20 min-h-20 min-w-20 shadow-md cursor-pointer rounded"
                >
                  <img
                    src={img}
                    onClick={() => setImage(index)}
                    alt="min-product"
                    className="w-full h-full object-scale-down rounded"
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute -ml-3 w-full h-full flex justify-between items-center">
            <button
              onClick={handleScrollLeft}
              className="bg-white p-1 rounded-full shadow-lg z-10 relative"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="bg-white p-1 rounded-full shadow-lg z-10 relative"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className="my-4 hidden lg:grid gap-3">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-base">{data.description}</p>
            </div>
            <div>
              <p className="font-semibold">Unit</p>
              <p className="text-base">{data.unit}</p>
            </div>
            {
              data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                return (
                  <div key={index+"more-details"}>
                    <p className="font-semibold">{element}</p>
                    <p className="text-base">{data?.more_details[element]}</p>
                  </div>
                )
              })
            }
        </div>
      </div>

      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p className="">{data.unit}</p>

        <Divider />

        <div>
          <p> Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {displayPriceInTaka(priceWithDiscount(data.price, data.discount))}
              </p>
            </div>
            {
              data.discount && (
                <p className="line-through">{displayPriceInTaka(data.price)}</p>
              )
            }
            {
              data.discount && (
                <p className="font-bold lg:text-2xl text-green-600">{data.discount}% <span className="text-base text-neutral-500">Discount</span></p>
              )
            }
          </div>
        </div>

        {/*(data.stock === 0 || data.stock === null)  */}
        {(data.stock === 0) ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
          <div className="my-4">
            <AddToCartButton data={data} />
          </div>
          // <button className="my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
          //   Add
          // </button>
        )}

        <h2 className="font-semibold">Why shop from binkeyit?</h2>
        <div>
          <div className="flex items-center gap-4 my-4">
            <img src={image1} alt="suberfast defivery" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold pb-1">Superfast Delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest from
                dark stores near your.{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image2} alt="Best prices offers" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold pb-1">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                manufactures.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image3} alt="Wide Assortment" className="w-20 h-20" />
            <div className="text-sm">
              <div className="font-semibold pb-1">Wide Assortment</div>
              <p>
                Choose from 5000+ product across food personal care, household &
                other categories.
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 lg:hidden grid gap-3 pt-2 lg:pt-0">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-base">{data.description}</p>
            </div>
            <div>
              <p className="font-semibold">Unit</p>
              <p className="text-base">{data.unit}</p>
            </div>
            {
              data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                return (
                  <div key={index+"more-details"}>
                    <p className="font-semibold">{element}</p>
                    <p className="text-base">{data?.more_details[element]}</p>
                  </div>
                )
              })
            }
        </div>

      </div>
    </section>
  );
};

export default ProductDisplayPage;
