import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { baseURL } from "../utils/globalPort";
const API = axios.create({ baseURL: baseURL })
API.interceptors.request.use((req) => {
    // req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    return req
})
export const getAllProducts = createAsyncThunk(
    'GET_ALL',
    async () => {
        const { data } = await API.get(`/api/product`)
        return data.products
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null,
    },
    extraReducers: {
        [getAllProducts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload
            state.status = 'success'
        },
        [getAllProducts.rejected]: (state) => {
            state.status = 'failed'
        },
    }
})

export default productSlice.reducer