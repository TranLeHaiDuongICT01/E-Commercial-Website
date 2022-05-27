import { START_LOADING, END_LOADING, GET_PRODUCTS, GET_SINGLE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../utils/constantType'

const reducer = (state = { isLoading: true, products: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage
            }
        case GET_SINGLE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                products: state?.products?.map(product => product._id === action.payload._id ? action.payload : product)
            }
        }
        case DELETE_PRODUCT: {
            return {
                ...state,
                products: state?.products?.filter(product => product._id !== action.payload._id)
            }
        }
        default:
            return state
    }
}
export default reducer