
import { createSlice } from "@reduxjs/toolkit";



var cartSlice = createSlice({

    name: 'items',

    initialState: {
        value:[] 
        
    },

    reducers: {

        fetchAllItems:(state,action)=>{
            state.value = action.payload
        },

        addItems: (state, action) => {
              const data = action.payload
              return  {...state, value:[...state.value,data]}
        }


     

    }
})
export const { addItems , fetchAllItems } = cartSlice.actions

export default cartSlice.reducer;
