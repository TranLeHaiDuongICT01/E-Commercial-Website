import { combineReducers } from '@reduxjs/toolkit'
import products from './products'
import auth from './auth'
import payment from './payment'
import category from './categories'

export default combineReducers({
    products, auth, payment, category
})