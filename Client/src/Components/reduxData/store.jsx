
import { configureStore } from "@reduxjs/toolkit";
import mySlice from './slice'

var store = configureStore({

    reducer : {
        ItemState : mySlice,     
    }
})

export default store;