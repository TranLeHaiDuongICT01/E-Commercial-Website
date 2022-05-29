import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AuthContext } from './context/auth-context'
import { useAuth } from './hook/auth-hook'
import Header from './components/Header'
import Homepage from './components/Homepage'
import Auth from './components/Auth/Auth'
import CreateProduct from './components/CreateProduct'
import Categories from './components/Categories'
import { getCategories } from './action/categories'
import ProductDetails from './components/Product/ProductDetails'
import OrderHistory from './components/History/OrderHistory'
import OrderDetail from './components/History/OrderDetail'
const App = () => {

  const { token, login, logout, userId } = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(getProducts())

    dispatch(getCategories())
  }, [dispatch])

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/login' element={<Auth />} />
          <Route exact path='/createProduct' element={<CreateProduct />} />
          <Route exact path='/categories' element={<Categories />} />
          <Route exact path='/history' element={<OrderHistory />} />
          <Route exact path='/history/:id' element={<OrderDetail />} />
          <Route exact path='/edit/:id' element={<ProductDetails />} />
          <Route exact path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App