import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Endpoints } from "../common/Endpoint";
import toast from "react-hot-toast";
import { Globalprovider } from "../components/provider/Globalprovider";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddTocartButton = ({ data }) => {
  const [loading, setloading] = useState(false);
  const { fetchAllitemfromcart, handleupdatecart, Deleteitemfromcart } =
    useContext(Globalprovider);
  const [Isitemavailableincart, setIsitemavailableincart] = useState(false);
  const [cartqty, setcartqty] = useState(null);
  const cartItem = useSelector((state) => state.cart.cart);
  const[cartqtyDetails,setcartqtyDetails]=useState(null)
  

  console.log(data,'dara')
  console.log(cartqtyDetails, "cartqtyDetails");
  const handleClickAddTocart = async (e) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      setloading(true);
      const added = await axios.post(
        Endpoints.Addtocart.url,
        { productId: data?._id },
        { withCredentials: true }
      );
      if (added) {
        toast.success(added?.data.message);
        fetchAllitemfromcart();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setloading(false);
    }
  };

  const handleincreae = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleupdatecart(cartqtyDetails?._id, cartqty + 1);
    toast.success('item added')
  };

  
  const handledecrese = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(cartqty === 1){
        Deleteitemfromcart(cartqtyDetails?._id)
        return false
    }
    handleupdatecart(cartqtyDetails?._id, cartqty-1);
    toast.success('item removed')
  };

  // checking if the item in my cart
  useEffect(() => {
    const check = cartItem.some(
      (item) => item?.productId?._id === data?._id
    );
    setIsitemavailableincart(check);

    const products = cartItem.find(
      (item) => item?.productId?._id === data?._id
    );
    setcartqty(products?.quantity);
    setcartqtyDetails(products);
  }, [data, cartItem]);
  
  return (
    <div>
      {Isitemavailableincart ? (
        <div className="flex gap-2 items-center">
          <button
            onClick={handledecrese}
            className="text-[15px] bg-green-600 hover:bg-green-700 text-white px-1 py-1 rounded-sm transition-all font-semibold" 
          >
            <FaMinus size={15} />
          </button>
          <p className="text-[15px] font-semibold ">{cartqty}</p>
          <button
            className="text-[15px] bg-green-600 hover:bg-green-700 text-white px-1 py-1 rounded-sm transition-all font-semibold"
            onClick={handleincreae}
          >
            <FaPlus size={15} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClickAddTocart}
          className="text-[15px] bg-green-700 text-white px-2 lg:px-3 py-1 rounded-sm"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddTocartButton;
