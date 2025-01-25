import { useEffect, useState } from "react";
import CardLoading from "../components/CardLoading";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noDataImage from "../assets/nothing here yet.webp"

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);  

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((preve) => {
            return [...preve, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  const handleFetchMore = () => {
    if(totalPage > page) {
      setPage(preve => preve + 1)
    }
  }  

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>
        {/* loading data */}
        <InfiniteScroll dataLength={data.length} hasMore={true} next={handleFetchMore}>
          <div className="lg:px-0 my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  lg:gap-y-8">
            {data.map((p, index) => {
              return (
                <CardProduct key={p?._id + "searchProduct" + index} data={p} />
              );
            })}

            

            {loading &&
              loadingArrayCard.map((_, index) => {
                return <CardLoading key={index} />;
              })}
          </div>
        </InfiniteScroll>
        {
          !data[0] && !loading && (
            <div className="flex justify-center items-center flex-col w-full h-full">
              <img src={noDataImage} alt="image" className="w-full h-full max-w-xs max-h-xs" />
              <p className="font-semibold my-1">No data found</p>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default SearchPage;
