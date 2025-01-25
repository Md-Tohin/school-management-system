import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom"
import SummaryApi from "../common/SummaryApi.js";
import Axios from "../utils/Axios.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!(location?.state?.data?.success)) {
      navigate('/')
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email
        }
      })
    }

  }, [])  

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const valideValue = Object.values(data).every((el) => el);

  const handleChange = (e) => {
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
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
        });        
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter Your New Password</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          
          <div className="grid gap-1">
            <label htmlFor="email">Email : </label>
            <input
              name="email"
              id="email"
              type="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              value={data.email}
              readOnly={true}
              disabled={true}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                name="newPassword"
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={data.newPassword}
                onChange={handleChange}
                className="w-full h-full outline-none bg-blue-50 py-1"
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowNewPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confrim Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={data.confirmPassword}
                onChange={handleChange}
                className="w-full h-full outline-none bg-blue-50 py-1"
                placeholder="Enter your confirm password"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!valideValue}
            className={`${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>
        <p>
          Back to ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ResetPassword
