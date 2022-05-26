import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import { DataProvider } from './GlobalState'
import Cart from './components/Cart/Cart'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFound from './utils/NotFound'
import { useDispatch } from 'react-redux'
import { getAllProducts } from './reducers/products'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])
  return (
    <DataProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/products' element={
            <Navigate to='/' replace />} />
          <Route exact path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App