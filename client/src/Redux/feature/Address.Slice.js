import { createSlice } from "@reduxjs/toolkit"


const intialvalue = {
    Addresses:[]
}

const addressslice =createSlice({
    name:"Address",
    initialState:intialvalue,
    reducers:{
        setAddressuser:(state,action)=>{
            state.Addresses=[...action.payload]
        }
    }
})

export const { setAddressuser } = addressslice.actions 
export default addressslice.reducer


