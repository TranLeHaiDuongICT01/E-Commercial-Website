import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import Cart from './components/Cart/Cart'
import Auth from './components/Auth/Auth'
import { useDispatch } from 'react-redux'
import { getUserInfo } from './action/auth'
import { AuthContext } from './context/auth-context'
import { useAuth } from './hook/auth-hook'
import ProductDetails from './components/HomePage/Product/ProductDetails'
import OrderHistory from './components/History/OrderHistory'
import OrderDetail from './components/History/OrderDetail'
import { getCategories } from './action/categories'
const App = () => {

  const { token, login, logout, userId, cart, setCart } = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        const user = await dispatch(getUserInfo())
        setCart(user?.cart)
      }
      fetchUser()
    }
  }, [token, dispatch, setCart])

  useEffect(() => {
    // dispatch(getProducts())
    
    dispatch(getCategories())
  }, [dispatch])


  return (
    <AuthContext.Provider value={{ cart: cart, token: token, userId: userId, login: login, logout: logout, setCart: setCart }}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={
            <Navigate to='/auth' replace />} />
          <Route exact path='/register' element={
            <Navigate to='/auth' replace />} />
          {!token &&
            <Route exact path='/auth' element={<Auth />} />
          }
          <Route exact path='/history' element={<OrderHistory />} />
          <Route exact path='/history/:id' element={<OrderDetail />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/products' element={
            <Navigate to='/' replace />} />
          <Route exact path='/products/:id' element={<ProductDetails />} />
          <Route exact path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App