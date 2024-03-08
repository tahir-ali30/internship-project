import { configureStore } from "@reduxjs/toolkit";
import userReducer from './states/user/userSlice'
import sellerReducer from './states/sellerInfo/sellerSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
    },
});