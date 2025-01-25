import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";

const UploadSubCategoryModal = ({ close, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const allCategory = useSelector((state) => state?.product?.allCategory);

  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(false);

    setSubCategoryData((preve) => {
      return {
        ...preve,
        // image: "http://res.cloudinary.com/dwxo33g8n/image/upload/v1736484763/binkeyit/uqterwfmhxjzfvwm4zed.png"
        image: ImageResponse?.data?.url,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    try {
        const response = await Axios({
            ...SummaryApi.createSubCategory,
            data: subCategoryData
        })
        const { data: responseData } = response;
        if(responseData.success){
            toast.success(responseData.message)            
            if(close){
                close();
            }
            if(fetchData){
              fetchData()
            }
        }
    } catch (error) {
        AxiosToastError(error)
    }
  };

  const handleRemoveCategorySelected = async(categoryId) => {
    const index = subCategoryData.category.findIndex(el => el._id === categoryId)
    subCategoryData.category.splice(index, 1)
    setSubCategoryData((preve) => {
        return {
            ...preve
        }
    });

  }

  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 p-4 bg-neutral-800 bg-opacity-70 z-50 flex justify-center items-center">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form action="" className="grid gap-3 my-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
              type="text"
              name="name"
              id="name"
              value={subCategoryData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {!subCategoryData.image ? (
                  <p className="text-sm text-neutral-400"> No Image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt="Sub Category"
                    className="w-full h-full object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="image">
                <div
                  className={`${
                    !subCategoryData.name
                      ? "bg-gray-400"
                      : "border-primary-200 hover:bg-primary-100"
                  } px-4 py-2 rounded cursor-pointer border font-medium`}
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  disabled={!subCategoryData.name}
                  onChange={handleUploadSubCategoryImage}
                  type="file"
                  id="image"
                  className="hidden"
                />
              </label>
            </div>
          </div>         

          <div className="grid gap-1">
            <label htmlFor="category">Select Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/* display value */}
              <div className="flex flex-wrap gap-2">
                {subCategoryData.category.map((cat) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                    >
                      {cat.name}
                      <div><IoClose size={20} className="cursor-pointer hover:text-red-600" onClick={() => handleRemoveCategorySelected(cat._id)}/></div>
                    </p>
                  );
                })}
              </div>
              {/* select category */}
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetail = allCategory.find(
                    (el) => el._id == value
                  );
                  setSubCategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetail],
                    };
                  });                  
                }}
                className="w-full p-2 bg-transparent outline-none border"
              >
                <option value={""} >
                  Select Category
                </option>
                {allCategory.map((category) => {
                  return (
                    <option
                      key={category?._id + "subcategory"}
                      value={category?._id}
                    >
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            disabled={!(subCategoryData.name && subCategoryData.image && subCategoryData.category[0])}
            className={`${(subCategoryData.name && subCategoryData.image && subCategoryData.category[0]) ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-400"
            } py-2 font-semibold rounded`}
          >
            Add Sub Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategoryModal;
