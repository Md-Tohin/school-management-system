import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import uploadImage from "../utils/UploadImage.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";

const UploadCategoryModal = ({ close, fetchData }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleChage = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true)
    const response = await uploadImage(file);
    const { data: ImageResponse} = response;
    setLoading(false)
    
    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse?.data?.url,
      };
    });
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full rounded p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button
            onClick={close}
            className="text-neutral-800 w-fit block ml-auto"
          >
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="my-3 grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleChage}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>

          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    !data.name
                      ? "bg-gray-400"
                      : "border-primary-200 hover:bg-primary-100"
                  } px-4 py-2 rounded cursor-pointer border font-medium`}
                >
                    {
                        loading ? "Loading..." : "Upload Image"
                    }
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
            disabled={!(data.name && data.image)}
            className={`${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-400"
            } py-2 font-semibold`}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModal;
