import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
  categories: [],
  loadingcategory: false,
  subcategory: [],
  product: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialvalue,
  reducers: {
    setcategories: (state, action) => {
      state.categories = [...action.payload];
    },
    loadingcategory: (state, action) => {
      state.loadingcategory = action.payload;
    },
    getsubcategories: (state, action) => {
      state.subcategory = Array.isArray(action.payload) ? action.payload : [];
    },
    setproduct:(state,action)=>{
        state.product = Array.isArray(action.payload) ? action.payload : [];
    },
  },
});

export const { setcategories,setproduct, getsubcategories, loadingcategory } =
  categorySlice.actions;
export default categorySlice.reducer;
