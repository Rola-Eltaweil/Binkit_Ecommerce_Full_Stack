import { createSlice } from "@reduxjs/toolkit"

const initialvalue ={
    orders:[]
}

const orderslice = createSlice({
  name: "Orders",
  initialState: initialvalue,
  reducers: {
    setorders:(state,action)=>{
      state.orders=[...action.payload]
    },
  },
});

export const {setorders}=orderslice.actions
export default orderslice.reducer