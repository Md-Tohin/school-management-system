import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { valideURLconvert } from "../utils/valideURLConvert";

const ProductListPage = () => {
  const params = useParams();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const category = params?.category?.split("-");
  const categoryName = category?.slice(0, category?.length - 1)?.join(" ");
  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  // console.log(allSubCategory);

  const fetchProductData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData(...data, ...responseData.data);
        }
        // setPage(responseData.page)
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  useEffect(() => {
    const sub = allSubCategory.filter((s) => {
      const filterData = s.category?.some((el) => {
        return el._id == categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, allSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* sub category */}
        <div className="min-h-[85vh] max-h-[80vh] overflow-y-scroll grid gap-1 shadow-md scrollBarCustom bg-white py-2">
          {displaySubCategory.map((s, index) => {
            const url = `/${valideURLconvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${valideURLconvert(s.name)}-${s._id}`;
            return (
              <Link
                to={url}
                key={s + "subcategory" + index}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 lg:gap-4 border-b box-border hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded ">
                  <img
                    src={s.image}
                    alt={"subcategory"}
                    className="w-14 h-full lg:h-14 lg:w-12 object-scale-down "
                  />
                </div>
                <p className="-mt-6 lg:mt-0 pt-1 text-xs lg:text-base text-center lg:text-left">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>
        {/* product */}
        <div className="sticky top-20 ">
          <div className="bg-white shadow-md p-4 z-10">
            <h3>
              <span className="font-semibold">{categoryName}</span> /{" "}
              <span className="font-medium">{subCategoryName}</span>
            </h3>
          </div>
          <div>
            <div className=" min-h-[77vh] max-h-[75vh] overflow-y-auto relative scrollBarCustom">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
              {data.map((p, index) => {
                return (
                  <CardProduct
                    key={p + "productsubcategory" + index}
                    data={p}
                  />
                );
              })}
            </div>
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
