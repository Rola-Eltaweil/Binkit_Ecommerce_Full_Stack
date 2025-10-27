import { createSlice } from "@reduxjs/toolkit"

const initialvalue = {
    cart:[]
}

const cartslice = createSlice({
    name:'cart',
    initialState:initialvalue,
    reducers:{
        setcartItems : (state,action)=>{
          state.cart = [...action.payload];
        }
    }
})

export const { setcartItems } = cartslice.actions;
export default cartslice.reducer