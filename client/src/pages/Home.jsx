import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import categoryImage from "../assets/images/category/Dairy-Bread-Eggs.png"
// import categoryImage2 from "../assets/images/category/Dairy-Bread-Eggs.png"
import { valideURLconvert } from "../utils/valideURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const Home = () => {
  const navigate = useNavigate();
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);

  const handleRedirectProductListPage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return (c._id == id)
      });
      return filterData ? true : null;
    });
    console.log(subcategory);
    
    const url = `/${valideURLconvert(cat)}-${id}/${subcategory !== undefined ? valideURLconvert(subcategory?.name)+'-'+subcategory?._id : 'null'}`
    navigate(url)
    console.log(url);
  }

  return (
    <section className="bg-white">
      {/* banner section start */}
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          }`}
        >
          <img
            src={banner}
            alt="banner"
            className="w-full h-full hidden lg:block"
          />
          <img
            src={bannerMobile}
            alt="banner"
            className="w-full h-full lg:hidden"
          />
        </div>
      </div>
      {/* banner section end */}

      {/* category section start */}
      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {
          loadingCategory ? (
            new Array(12).fill(null).map((c, index) => {          
              return (
                <div key={index} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>                  
                </div>
              );
            })
          ) : (
            categoryData.map((cat, index) => {
              return (
                <div key={cat._id+index+"displayCategory"} className="w-full h-full cursor-pointer" onClick={() => handleRedirectProductListPage(cat._id, cat.name)}>
                  <div> {/* cat.image :categoryImage  */}
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-scale-down" />
                  </div>
                </div>
              )
            })            
          )   
        }
      </div>
      {/* category section end */}

      {/* display category product start */}
      {
        categoryData.map((c, index) => {          
          return (
            <CategoryWiseProductDisplay key={c?._id+index+'category'} id={c?._id} name={c?.name} />
          )
        })
      }      
      {/* display category product end */}
    </section>
  );
};

export default Home;
