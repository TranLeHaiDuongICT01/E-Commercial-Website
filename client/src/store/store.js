import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from '../reducers/products'
export default configureStore({
    reducer: {
        products: ProductsReducer
    }
})