import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage.js";
import Loading from "../components/Loading.jsx";
import ViewImage from "../components/ViewImage.jsx";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent.jsx";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import SuccessAlert from "../utils/SuccessAlert.js";

const UploadProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageloading, setImageLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const allSubCategory = useSelector(state => state.product.allSubCategory);
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async(e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setImageLoading(true)
    const response = await uploadImage(file);
    const { data: ImageResponse} = response;
    const imageUrl = ImageResponse?.data?.url;
    // const imageUrl = "http://res.cloudinary.com/dwxo33g8n/image/upload/v1736583261/binkeyit/ajxi6c0ierfgbk85igrs.webp";

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false)
  }

  const handleDeleteImage = async(index) => {
    data.image.splice(index, 1)
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveCategory = async(index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async(index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      }
    })
  }

  const handleAddField = () => {
    setData((preve) => {
      return{
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName] : ""
        }
      }
    })

    setFieldName("");
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      })

      const { data: responseData } = response;

      if (responseData.success) {
        SuccessAlert(responseData.message);
        // toast.success(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {}
        })
      }

    } catch (error) {
      AxiosToastError(error)
    } finally{
      loading(false)
    }
    
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>

      <div className="grid p-3">
        <form
          action=""
          className="grid gap-4 my-3"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">Name</label>
            <input
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter name"
              autoFocus={true}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">Description</label>
            <textarea
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded resize-none"
              type="text"
              name="description"
              id="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Enter parduct description"
              rows={3}
              multiple
            ></textarea>
          </div>
          <div className="grid gap-1">
            <p className="font-medium">Image</p>
            <div>
              <label
                htmlFor="productImage"
                className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer focus-within:border-primary-200"
              >
                <div className="flex justify-center items-center flex-col">
                  {
                    imageloading ?
                    <Loading />
                    : (
                      <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                      </>
                    )
                  }                  
                </div>
                <input type="file" id="productImage" className="hidden" accept="image/*" onChange={handleUploadImage} />
              </label>
              {/* display upload image */}
              <div className="flex flex-wrap gap-4">
              {
                data.image.map((img, index) => {
                  return (
                    <div key={img+index} className="h-20 w-20 min-w-20 mt-1 bg-blue-50 border relative group">
                      <img src={img} alt={img} className="w-full h-full object-scale-down cursor-pointer" onClick={() => setViewImageURL(img)} />
                      <div onClick={() => handleDeleteImage(index)} className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-500 text-white rounded hidden group-hover:block cursor-pointer">
                        <MdDelete size={20} />
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="category" className="font-medium">Category</label>
            <div>
              <select 
              id="category"
              value={selectCategory} 
              onChange={(e) => {
                const value = e.target.value;
                const category = allCategory.find((el) => el._id === value)
                setData((preve) => {
                  return{
                    ...preve,
                    category: [...preve.category, category]
                  }
                })

                setSelectCategory("")
                
              }} className="bg-blue-50 border w-full rounded outline-none focus-within:border-primary-200 p-2">
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option key={index} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className="flex flex-wrap gap-3">
                {
                  data.category.map((c,index) => {
                    return (
                      <div key={c._id+index+"productsection"} className="text-sm flex items-center gap-1 bg-blue-50 mt-2 px-1 rounded">
                        <p>{c.name}</p>
                        <div className="hover:text-red-500 cursor-pointer" onClick={() => handleRemoveCategory(index)}>
                        <IoClose size={20}/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="subcategory" className="font-medium">Sub Category</label>
            <div>
              <select 
              id="subcategory"
              value={selectSubCategory} 
              onChange={(e) => {
                const value = e.target.value;
                const subcategory = allSubCategory.find((el) => el._id === value)
                setData((preve) => {
                  return{
                    ...preve,
                    subCategory: [...preve.subCategory, subcategory]
                  }
                })

                setSelectSubCategory("")
                
              }} className="bg-blue-50 border w-full rounded outline-none focus-within:border-primary-200 p-2">
                <option value={""} className="text-neutral-600">Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option key={index} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className="flex flex-wrap gap-3">
                {
                  data.subCategory.map((c,index) => {
                    return (
                      <div key={c._id+index+"productsection"} className="text-sm flex items-center gap-1 bg-blue-50 mt-2 px-1 rounded">
                        <p>{c.name}</p>
                        <div className="hover:text-red-500 cursor-pointer" onClick={() => handleRemoveSubCategory(index)}>
                        <IoClose size={20}/>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="unit" className="font-medium">Unit</label>
            <input
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
              type="text"
              name="unit"
              id="unit"
              value={data.unit}
              onChange={handleChange}
              placeholder="Enter product unit"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="stock" className="font-medium">Number of Stock</label>
            <input
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
              type="number"
              name="stock"
              id="stock"
              value={data.stock}
              onChange={handleChange}
              placeholder="Enter product stock"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="price" className="font-medium">Price</label>
            <input
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
              type="number"
              name="price"
              id="price"
              value={data.price}
              onChange={handleChange}
              placeholder="Enter product price"
            />
          </div>          
          <div className="grid gap-1">
            <label htmlFor="discount" className="font-medium">Discount</label>
            <input
              className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
              type="number"
              name="discount"
              id="discount"
              value={data.discount}
              onChange={handleChange}
              placeholder="Enter product discount"
            />
          </div>

          {/* Add more field */}
          <div>
            {
              Object?.keys(data?.more_details)?.map((k,index) => {
                return (
                  <div key={k+index+'field'} className="grid gap-1 mb-2">
                    <label htmlFor={k} className="font-medium">{k}</label>
                    <input
                      className="bg-blue-50 p-2 border outline-none focus-within:border-primary-200 rounded "
                      type="text"
                      id={k}
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k] : value
                            }
                          }
                        })
                      }}
                      placeholder={`Enter ${k}`}
                    />
                  </div>
                )
              })
            }
          </div>
          <div onClick={() => setOpenAddField(true)} className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 rounded cursor-pointer">
            Add Fields
          </div>

            <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold ">
              Submit
            </button>
        </form>
      </div>

      {
        viewImageURL && (
          <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
        )
      }

      {
        openAddField && (
          <AddFieldComponent value={fieldName} onChange={(e) => setFieldName(e.target.value)} submit={handleAddField} close={() => setOpenAddField(false)} />
        )
      }
    </section>
  );
};

export default UploadProduct;
