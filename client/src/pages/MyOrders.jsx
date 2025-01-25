import { useSelector } from "react-redux";
import NoData from "../components/NoData";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import EditOrderStatus from "../components/EditOrderStatus";

const MyOrders = () => {
  const orderList = useSelector((state) => state.orders.order);
  const [openDeliveryStatusModal, setOpenDeliveryStatusModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});

  return (
    <section>
      <div className="p-2 py-3 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Orders</h2>
      </div>

      {!orderList[0] && <NoData />}

      <div className="p-4  bg-blue-50">
        <div className="min-h-[63vh]">
          <div className="grid  gap-4">
            {orderList.map((order, index) => {
              return (
                <div
                  key={"order-" + index}
                  className={`border rounded p-3 flex gap-3 items-center bg-white hover:bg-gray-50`}
                >
                  <div className="w-full flex flex-col lg:flex-row items-center gap-4 relative">
                    <div className="absolute top-1 right-1 block lg:hidden">
                      <button
                        onClick={() => {
                          setOpenDeliveryStatusModal(true);
                          setOrderDetails(order);
                        }}
                        className="bg-green-200 p-2 rounded hover:text-white hover:bg-green-600"
                      >
                        <MdEdit />
                      </button>
                    </div>
                    <div>
                      <img
                        src={order?.product_details?.image[0]}
                        alt="product image"
                        className="w-44 h-44 object-scale-down rounded"
                      />
                    </div>
                    <div>
                      <p>
                        <b className="font-semibold">Order no:</b>{" "}
                        {order?.orderId}
                      </p>
                      <p>
                        <b className="font-semibold">Order Date:</b>{" "}
                        {new Date(order?.orderDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p>
                        <span className="font-semibold">Payment Status:</span>{" "}
                        {order?.payment_status}
                      </p>
                      <p>
                        <span className="font-semibold">Order Status:</span>{" "}
                        <span
                          className={`${
                            order?.order_status == "Pending" &&
                            "bg-orange-300 text-orange-800"
                          } ${
                            order?.order_status == "Processing" &&
                            "bg-amber-300 text-amber-800"
                          } ${
                            order?.order_status == "Confirm" &&
                            "bg-cyan-300 text-cyan-800"
                          } ${
                            order?.order_status == "Delivered" &&
                            "bg-green-300 text-green-800"
                          } ${
                            order?.order_status == "Cancel" &&
                            "bg-red-300 text-red-800"
                          } py-1 px-2 rounded-full`}
                        >
                          {order?.order_status}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">User Info:</span>{" "}
                        {order?.userId?.name} ({order?.userId?.mobile})
                      </p>
                      <p>
                        <span className="font-semibold">Delivery Info:</span>{" "}
                        {order?.delivery_address?.address_line +
                          "," +
                          order?.delivery_address?.sub_district}
                        , <br /> {order?.delivery_address?.district},{" "}
                        {order?.delivery_address?.division},{" "}
                        {order?.delivery_address?.country}
                      </p>
                      <p>
                        <span className="font-semibold">Receive By:</span>{" "}
                        {order?.delivery_address?.mobile}
                      </p>
                    </div>
                  </div>
                  <div className="lg:grid gap-10 hidden">
                    <button
                      onClick={() => {
                        setOpenDeliveryStatusModal(true);
                        setOrderDetails(order);
                      }}
                      className="bg-green-200 p-2 rounded hover:text-white hover:bg-green-600"
                    >
                      <MdEdit />
                    </button>                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {openDeliveryStatusModal && (
        <EditOrderStatus
          data={orderDetails}
          close={() => setOpenDeliveryStatusModal(false)}
        />
      )}
    </section>
  );
};

export default MyOrders;
