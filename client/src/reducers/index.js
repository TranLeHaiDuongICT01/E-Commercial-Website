import { combineReducers } from '@reduxjs/toolkit'
import products from './products'
import auth from './auth'

export default combineReducers({
    products, auth
})