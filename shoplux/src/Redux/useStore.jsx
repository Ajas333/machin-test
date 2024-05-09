import { configureStore } from "@reduxjs/toolkit";
import authenticationSliceReducer from './Authentication/authenticationSlice'
import cartReducer from "./CartUpdate/CartReducer";

export default configureStore({
    reducer:{
        authentication_user:authenticationSliceReducer,
        cart:cartReducer,
    }
})