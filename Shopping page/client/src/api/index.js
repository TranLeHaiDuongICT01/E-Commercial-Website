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

export const getProducts = () => API.get(`/api/product`)

export const getSingleProduct = (id) => API.get(`/api/product/${id}`)

export const createProduct = (product) => API.post('/api/product', product)

export const updateProduct = (id, product) => API.patch(`/api/product/${id}`, product)

export const deleteProduct = (id) => API.patch(`/api/product/${id}`)

export const login = (user) => API.post(`/user/login`, user)

export const register = (user) => API.post('/user/register', user)

export const logout = () => API.get('/user/logout')

export const getUserInfo = () => API.get('/user/infor')

export const getUserHistory = () => API.get('/user/history')

export const updateUser = (updatedUser) => API.patch('/user/update', updatedUser)

export const createPayment = (payment) => API.post('/api/payment', payment)
