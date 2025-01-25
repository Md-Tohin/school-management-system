import { IoClose } from "react-icons/io5";
import UserMenu from "../components/UserMenu";
import { useNavigate } from "react-router-dom";

const UserMenuMobile = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-white w-full h-full py-2">        
      <div className="container mx-auto px-3 pb-8">
        <button onClick={() => navigate('/')} className="text-neutral-800 block w-fit ml-auto">
            <IoClose size={25}/>
        </button>
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
