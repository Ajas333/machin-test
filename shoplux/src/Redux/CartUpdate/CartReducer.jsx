import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice(
    {
        name : 'update_cart',
        initialState:{
            cart_Count:0

        },
        reducers:{
            update:(state)=>{
                state.cart_Total
            }
        }
    }
);

export const{increment,decrement } = cartSlice.actions;
export default cartSlice.reducer;