import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const EditOrderStatus = ({ close, data }) => {
    const { fetchOrder } = useGlobalContext();

    const [orderStatus, setOrderStatus] = useState({
        _id: data?._id,
        order_status: ""
    })

    const handleChange = (e) => {        
        const { name, value } = e.target;
        setOrderStatus((preve) => {
          return {
            ...preve,
            [name]: value,
          };
        });
      };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const response = await Axios({
        ...SummaryApi.updateOrderDeliveryStatus,
        data: orderStatus,
      });
      const { data: responseData } = response;

      if (responseData.success) {        
        toast.success(responseData.message);
        if (fetchOrder) {
            fetchOrder();
        }
        if (close) {
            close()
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } 
  };

  return (
    <section className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 flex pr-4 justify-center items-center">
      <div className="bg-white p-4 w-full max-w-2xl mt-8 lg:mx-auto rounded mx-2">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-semibold">Change Order Status</h2>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <div className={`rounded p-3 flex gap-3 items-center bg-white hover:bg-gray-50`} >
          <div className="w-full flex flex-col lg:flex-row items-center gap-4">
            <div>
              <img
                src={data?.product_details?.image[0]}
                alt="product image"
                className="w-44 h-44 object-scale-down rounded"
              />
            </div>
            <div>
              <p>
                <b className="font-semibold">Order no:</b> {data?.orderId}
              </p>
              <p>
                <b className="font-semibold">Order Date:</b>{" "}
                {new Date(data?.orderDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold">Payment Status:</span>{" "}
                {data?.payment_status}
              </p>
              <p>
                        <span className="font-semibold">Order Status:</span>{" "}
                        <span
                          className={`${
                            data?.order_status == "Pending" &&
                            "bg-orange-300 text-orange-800"
                          } ${
                            data?.order_status == "Processing" &&
                            "bg-amber-300 text-amber-800"
                          } ${
                            data?.order_status == "Confirm" &&
                            "bg-cyan-300 text-cyan-800"
                          } ${
                            data?.order_status == "Delivered" &&
                            "bg-green-300 text-green-800"
                          } ${
                            data?.order_status == "Cancel" &&
                            "bg-red-300 text-red-800"
                          } py-1 px-2 rounded-full`}
                        >
                          {data?.order_status}
                        </span>
                      </p>
              <p>
                <span className="font-semibold">User Info:</span>{" "}
                {data?.userId?.name} ({data?.userId?.mobile})
              </p>
              <p>
                <span className="font-semibold">Delivery Info:</span>{" "}
                {data?.delivery_address?.address_line +
                  "," +
                  data?.delivery_address?.sub_district}
                , <br /> {data?.delivery_address?.district},{" "}
                {data?.delivery_address?.division},{" "}
                {data?.delivery_address?.country}
              </p>
              <p>
                <span className="font-semibold">Receive By:</span>{" "}
                {data?.delivery_address?.mobile}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 grid gap-4 max-h-[70vh] overflow-auto scrollBarCustom"
        >
          <div className="grid gap-1">
            <label htmlFor="delivery_status" className="font-semibold">Select Status : </label>
            <select autoFocus={true} name="order_status" id="delivery_status" onChange={handleChange} className="border focus-within:border-primary-200 bg-blue-50 p-2 py-3 rounded outline-none">
                <option value="Pending" selected={data?.order_status == "Pending" ? true : false }>Pending</option>
                <option value="Processing" selected={data?.order_status == "Processing" ? true : false }>Processing</option>
                <option value="Confirm" selected={data?.order_status == "Confirm" ? true : false }>Confirm</option>
                <option value="Delivered" selected={data?.order_status == "Delivered" ? true : false }>Delivered</option>
                <option value="Cancel" selected={data?.order_status == "Cancel" ? true : false }>Cancel</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-primary-200 hover:bg-primary-100 w-full py-2 font-semibold rounded mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditOrderStatus;
