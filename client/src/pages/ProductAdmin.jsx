import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import Loading from "../components/Loading.jsx";
import NoData from "../components/NoData.jsx";
import ProductCardAdmin from "../components/ProductCardAdmin.jsx";
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount,setTotalPageCount] = useState(1)
  const [search, setSearch] = useState("");

  const fecchPrdouctData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage)
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecchPrdouctData();
  }, [page]);

  const handleNext = ()=>{
    if(page !== totalPageCount){
      setPage(preve => preve + 1)
    }
  }

  const handlePrevious = () => {
    if(page > 1){
      setPage(preve => preve - 1)
    }
  }

  const handleOnChange = (e) => {
    const {value} = e.target;
    setSearch(value)    
    setPage(1)
  }

  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if(flag) {        
        fecchPrdouctData()
        flag = false
      }
    }, 300)
    return ( )=> {
      clearTimeout(interval)
    }
  }, [search])

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Product</h2>
        <div className="bg-blue-50 min-w-24 max-w-56 w-full ml-auto px-2 py-2 flex items-center gap-3 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={20}/>
          <input value={search} onChange={handleOnChange} type="text" className="h-full w-full outline-none bg-transparent " placeholder="Search product here..." />
        </div>
      </div>

      {loading && <Loading />}

      {!productData[0] && !loading && <NoData />}

      <div className="p-4 bg-blue-50 ">
        <div className="min-h-[63vh]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productData.map((p, index) => {
            return (
              <ProductCardAdmin fecchPrdouctData={fecchPrdouctData} key={p._id + index + "product"} data={p} />
            );
          })}
        </div>
        <div className="flex justify-between items-center my-4">
          <button onClick={handlePrevious} className="border border-primary-200 px-4 py-1 hover:bg-primary-200 rounded">Previous</button>
          <button className="w-full bg-slate-100">{page}/{totalPageCount}</button>
          <button onClick={handleNext} className="border border-primary-200 px-4 py-1 hover:bg-primary-200 rounded">Next</button>
        </div>
        </div>
      </div>
      
    </section>
  );
};

export default ProductAdmin;
