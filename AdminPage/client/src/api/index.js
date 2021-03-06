import axios from 'axios'
import { baseURL } from "../utils/globalPort";
const API = axios.create({ baseURL: baseURL })
API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
        req.headers.Authorization = `Bearer ${user?.token}`
    }
    return req
})

export const getProducts = (query) => API.get(`/api/product?${query ? query : ''}`)

export const getSingleProduct = (id) => API.get(`/api/product/${id}`)

export const createProduct = (product) => API.post('/api/product', product)

export const updateProduct = (id, product) => API.patch(`/api/product/${id}`, product)

export const deleteProduct = (id) => API.delete(`/api/product/${id}`)

export const login = (user) => API.post(`/user/login`, user)

export const register = (user) => API.post('/user/register', user)

export const logout = () => API.get('/user/logout')

export const getUserInfo = () => API.get('/user/infor')

export const getPayments = () => API.get('/api/payment')

export const getCategories = () => API.get('/api/category')

export const createCategory = (category) => API.post(`/api/category`, category)

export const deleteCategory = (id) => API.delete(`/api/category/${id}`)

export const updateCategory = (id, category) => API.patch(`/api/category/${id}`, category)

export const getSingleCategory = (id) => API.get(`/api/category/${id}`)
