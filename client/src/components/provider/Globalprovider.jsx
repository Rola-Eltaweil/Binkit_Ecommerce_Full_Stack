import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Endpoints } from "../../common/Endpoint";
import axios from "axios";
import { setcartItems } from "../../Redux/feature/cart";
import AxiosToastError from "../../utils/AxiosToastError";
import toast from "react-hot-toast";
import { pricewithdiscount } from "../../utils/Pricewithdiscount";
import { setAddressuser } from "../../Redux/feature/Address.Slice";
import {setorders} from '../../Redux/feature/OrderSlice'

export const Globalprovider = createContext(null);

export const useClobalcontext = () => useContext(Globalprovider);

export const Providercontext = ({ children }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state?.cart?.cart);
  const user = useSelector((state) => state?.user);
  const [quntity, setquntity] = useState(null);
  const [totalprice, settotalprice] = useState(null);
  const [totalpricewithnodiscount, settotalpriceNodiscount] = useState(null);
  
  useEffect(() => {
    fetchAllitemfromcart();
  }, []);

  const fetchAllitemfromcart = async () => {
    try {
      const getall = await axios.get(Endpoints.getallfromcart.url, {
        withCredentials: true,
      });
      if (getall) {
        dispatch(setcartItems(getall?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleupdatecart = async (_id, quantity) => {
    try {
      const updated = await axios.put(
        Endpoints.updatecartquantity.url,
        {
          _id: _id,
          quantity: quantity,
        },
        { withCredentials: true }
      );
      if (updated) {
        console.log(updated, "yes updated");
        fetchAllitemfromcart();
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const Deleteitemfromcart = async (id) => {
    try {
      const deltedone = await axios.delete(
        Endpoints.deletedproductfromcart.url,
        {
          data: {
            _id: id,
          },
          withCredentials: true,
        }
      );
      if (deltedone) {
        toast.success(deltedone?.data?.message);
        fetchAllitemfromcart();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    const qty = cart.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setquntity(qty);
    const totalqty = cart.reduce((prev, curr) => {
      return (
        prev +
        pricewithdiscount(
          curr?.productId?.price,
          curr?.productId?.discount
        ) *
          Number(curr?.quantity)
      );
    }, 0);
    settotalprice(totalqty);
  }, [cart]);


  useEffect(() => {
    const totalNoDiscount = cart.reduce((prev, curr) => {
      const originalPrice = curr?.productId?.price || 0;
      const quantity = Number(curr?.quantity) || 0;
      return prev + originalPrice * quantity;
    }, 0);

    settotalpriceNodiscount(totalNoDiscount);
  }, [cart]);
  

  useEffect(() => {
    fetchAddressuser();
  }, [user]);

  const fetchAddressuser = async()=>{
    try {
      const getall =await axios.get(Endpoints.getAddress.url,{withCredentials:true})
      if(getall){
        console.log(getall)
        dispatch(setAddressuser(getall?.data?.data))
      }
    } catch (error) {
      AxiosToastError(error)
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchorders()
  },[user])

  const fetchorders = async()=>{
    try {
      const fetchorder = await axios.get(Endpoints.getorders.url,{withCredentials:true})
      if(fetchorder){
        dispatch(setorders(fetchorder?.data?.data));
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Globalprovider.Provider
      value={{
        fetchAllitemfromcart,
        handleupdatecart,
        Deleteitemfromcart,
        quntity,
        totalprice,
        totalpricewithnodiscount,
        fetchAddressuser,
        fetchorders,
      }}
    >
      {children}
    </Globalprovider.Provider>
  );
};
