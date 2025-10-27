import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../feature/userSlice'
import catgeoryReducer from "../feature/categorySlice";
import Addressreducer from '../feature/Address.Slice'
import Cart from '../feature/cart'
import OrderReducer from '../feature/OrderSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: catgeoryReducer,
    cart:Cart,
    address:Addressreducer,
    order:OrderReducer
  },
});
