import { useState } from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";
import AddAddress from "../components/AddAddress";
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import ConfirmBox from "../components/ConfirmBox";

const Address = () => {
  const [loading, setLoading] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state?.addresses?.addressList);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [disableAddress, setDisableAddress] = useState({
    _id: ""
  })

  const handleDisableAddress = async () => {
    try {
      setLoading(true);
     
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data: {
          _id: disableAddress
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {        
        toast.success(responseData.message);
        if (fetchAddress) {
          fetchAddress();
        }
        if (setOpenConfirmBoxDelete) {
          setOpenConfirmBoxDelete()
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="font-semibold text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full text-primary-200 hover:text-white"
        >
          Add Address
        </button>
      </div>

      {!addressList[0] && <NoData />}

      <div className="p-4  bg-blue-50">
        <div className="min-h-[63vh]">
          <div className="grid  gap-4">
            {addressList.map((address, index) => {
              return (
                <div
                  key={"address-" + index}
                  className={`${
                    !address?.status && "hidden"
                  } border rounded p-3 flex gap-3 items-center bg-white hover:bg-gray-50`}
                >
                  <div className="w-full">
                    <p>{address?.address_line}</p>
                    <p>Post code: {address?.post_code}</p>
                    <p>
                      {address?.sub_district}, {address?.district}
                    </p>
                    <p>
                      {address?.division}, {address?.country}
                    </p>
                    <p>{address?.mobile}</p>
                  </div>
                  <div className="grid gap-10">
                    <button
                      onClick={() => {
                        setOpenEdit(true);
                        setEditData(address);
                      }}
                      className="bg-green-200 p-2 rounded hover:text-white hover:bg-green-600"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => {
                        setOpenConfirmBoxDelete(true);
                        setDisableAddress(address?._id);
                      }}
                      className="bg-red-200 p-2 rounded hover:text-white hover:bg-red-600"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && (
        <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDisableAddress} />
      )}
    </section>
  );
};

export default Address;
