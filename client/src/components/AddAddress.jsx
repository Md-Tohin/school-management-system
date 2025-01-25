import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const AddAddress = ({ close }) => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false)
  const { fetchAddress } = useGlobalContext();

  const onSubmit = async(data) => {
    try {
      setLoading(true)      
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          address_line: data.address_line, 
          post_code: data.post_code,
          sub_district: data.sub_district,
          district: data.district,
          division: data.division,
          country: data.country,
          mobile: data.mobile
        }
      }) 

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message)
        fetchAddress()
        if(close) {
          close()
        }
        reset()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  };

  return (
    <section className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 flex pr-4 justify-center items-center">
      <div className="bg-white p-4 w-full max-w-xl mt-8 lg:mx-auto rounded mx-2">
        <div className="flex justify-between items-center gap-4">
          <h2 className="font-semibold">Add Address</h2>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 grid gap-4 max-h-[70vh] overflow-auto scrollBarCustom"
        >
          <div className="grid gap-1">
            <label htmlFor="address">Address Line : </label>
            <input
              {...register("address_line", { required: true })}
              type="text"
              id="address"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              autoFocus={true}
              placeholder="Address"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="postCode">Post Code: </label>
            <input
              {...register("post_code", { required: true })}
              type="text"
              id="postCode"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              placeholder="Post Code..."
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="subDistrict">Sub District: </label>
            <input
              {...register("sub_district", { required: true })}
              type="text"
              id="subDistrict"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              placeholder="Sub District..."
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="district">District: </label>
            <input
              {...register("district", { required: true })}
              type="text"
              id="district"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              placeholder="District..."
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="division">Division: </label>
            <input
              {...register("division", { required: true })}
              type="text"
              id="division"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              placeholder="Division..."
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="country">Country: </label>
            <input
              {...register("country", { required: true })}
              type="text"
              id="country"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              placeholder="Country..."
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="mobile">Mobile: </label>
            <input
              {...register("mobile", { required: true })}
              type="text"
              id="mobile"
              className="border focus-within:border-primary-200 bg-blue-50 p-2 rounded outline-none"
              placeholder="Mobile..."
            />
          </div>
          <button
            type="submit"
            className="bg-primary-200 hover:bg-primary-100 w-full py-2 font-semibold rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddAddress;
