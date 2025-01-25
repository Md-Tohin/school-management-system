import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice.js";
import AxiosToastError from "./utils/AxiosToastError.js";
import Axios from "./utils/Axios.js";
import SummaryApi from "./common/SummaryApi.js";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "./store/productSlice.js";
import { handleAddItemCart } from "./store/cartProduct.js";
import GlobalProvider from "./provider/GlobalProvider.jsx";
import CartMobile from "./components/CartMobile.jsx";

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation()

  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchCartItem = async() => {
  //   try {
  //     const response = await Axios({
  //       ...SummaryApi.getCartItem
  //     })

  //     const { data: responseData } = response

  //     if(responseData.success) {
  //       dispatch(handleAddItemCart(responseData.data))
  //     }
  //   } catch (error) {
  //     console.log(error);

  //   }
  // }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem();
  }, []);

  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {
        location.pathname !== "/checkout" && (
          <CartMobile />
        )
      }
    </GlobalProvider>
  );
};

export default App;
