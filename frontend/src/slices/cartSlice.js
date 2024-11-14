import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtil';

// It checks if there’s a saved cart in localStorage (which would be stored as a string).
// If it exists, it retrieves and parses it from JSON format to object.
// If it doesn’t exist, it defaults to an object with an empty array 
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], 
    shippingAddress: {}, paymentMethod: 'PayPal' 
};

// slice - a piece of the store’s state
// includes all reducer logic. action creators needed to handle update to part of a state
const cartSlice = createSlice({
    // which will prefix the action types generated (e.g., cart/addToCart).
    name: "cart",

    // The starting state for this slice of the store
    initialState,

    // reducers specify how the state should change in response to actions.
    reducers: {
        addToCart: (state, action) => {
            // action.payload - represents the new item that will be added (or updated if it already exists in the cart).
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if(existItem){
                // state.cartItems.map(...) updates the cart by replacing the old item with the new one from action.payload
                // eg: updating the cart with increasing qty
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x); 
            }
            else{

                // the item is new to the cart - adds the new item to the end of the cartItems array.
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);
        },

        removeFromCart: (state, action) => {
            // action.payload: This contains the _id of the item that should be removed.
            // If they are not equal, the item will be included in the new array. If they are equal, 
            // it means this item matches the one to be removed, so it is excluded from the new array
state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },

        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },

        resetCart: (state) => (state = initialState)
    }
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart} = cartSlice.actions;

export default cartSlice.reducer;