import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { fetchuserDetails } from "./utils/fetchuserDetails";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetuserDetails } from "./Redux/feature/userSlice";
import axios from "axios";
import { Endpoints } from "./common/Endpoint";
import {
  getsubcategories,
  loadingcategory,
  setcategories,
} from "./Redux/feature/categorySlice";
import { setcartItems } from "./Redux/feature/cart";
import { Providercontext } from "./components/provider/Globalprovider";
import CartItemmobile from "./pages/CartItemmobile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const cartItem =useSelector((state)=>state?.cart?.cart)
  const location =useLocation()

  useEffect(() => {
    userData();
  }, [dispatch]);

  useEffect(() => {
      GetCategories();
      fechSubcategory();
  }, [ dispatch]);

  useEffect(()=>{
     fetchAllitemfromcart();

  },[user])

  const userData = async () => {
    const getuserData = await fetchuserDetails();
    dispatch(SetuserDetails(getuserData?.data));
  };

  const GetCategories = async () => {
    try {
      dispatch(loadingcategory(true));
      const Getall = await axios.get(Endpoints.Getcategories.url);
      if (Getall) {
        dispatch(setcategories(Getall?.data?.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingcategory(false));
    }
  };

  const fechSubcategory = async () => {
    try {
      const Getallsub = await axios.get(Endpoints.GetallSubcategory.url);
      if (Getallsub) {
        dispatch(getsubcategories(Getallsub?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllitemfromcart = async()=>{
    try {
      const getall = await axios.get(Endpoints.getallfromcart.url,{withCredentials:true});
      if(getall){
        dispatch(setcartItems(getall?.data?.data))
      }
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <Providercontext>
      <div className="min-h-screen flex flex-col">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ style: { fontSize: "16px" } }}
        />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        {location?.pathname !== "/checkout" && 
            cartItem.length > 0 && <CartItemmobile />
        }

        
        <Footer />
      </div>
    </Providercontext>
  );
}

export default App;
