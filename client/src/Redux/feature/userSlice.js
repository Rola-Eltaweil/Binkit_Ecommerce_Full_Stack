
import { createSlice } from "@reduxjs/toolkit";


const initialvalue = {
  name: "",
  email: "",
  _id: "",
  avatar: "",
  mobile: "",
  last_login_date: "",
  verify_email:"",
  status: "",
  address_details: [],
  shopping_cart:[],
  orderHistory:[],
  role:""
};


const userSlice = createSlice({
  name: "user",
  initialState : initialvalue,
  reducers: {
    SetuserDetails: (state, action) => {
        state.name = action.payload?.name,
          state.email = action.payload?.email,
          state._id = action.payload?._id,
          state.avatar = action.payload?.avatar,
          state.mobile = action.payload?.mobile,
          state.verify_email = action.payload?.verify_email,
          state.last_login_date = action.payload?.last_login_date,
            state.address_details = action.payload.address_details
          ,
            state.shopping_cart = action.payload.shopping_cart,
            state.orderHistory = action.payload.orderHistory,
            state.role = action.payload.role;
          state.status=action.payload.status

    },
      updatedImageAvatar:(state,action)=>{
      state.avatar = action.payload
  },
    logout:(state,action)=>{
       (state.name = ""),
         (state.email = ""),
         (state._id = ""),
         (state.avatar = ""),
         (state.mobile = ""),
         (state.verify_email = ""),
         (state.last_login_date = ""),
         (state.address_details = []),
         (state.shopping_cart = []),
         (state.orderHistory = []),
         (state.role = "");
       state.status = "";
    }
  },

});


export const { SetuserDetails, logout, updatedImageAvatar } = userSlice.actions;

export default userSlice.reducer