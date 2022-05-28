import { Button, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth-context'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updatedUser } from '../../action/auth'
import { createPayment } from '../../action/payment'
import PayPal from './PayPal'
const Cart = () => {
  const dispatch = useDispatch()
  const auth = useContext(AuthContext)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const getTotal = () => {
      const total = auth?.cart?.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0)
      setTotal(total)
    }
    getTotal()
  }, [auth?.cart])
  if (auth?.cart.length === 0) {
    return <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>Cart Empty</h2>
      <Button component={Link} to='/' variant='contained' sx={{ width: '200px' }}>Continue Shopping</Button>
    </Container>
  }

  const handleDelete = (id) => {
    auth.cart = auth?.cart?.filter(item => item._id !== id)
    auth.setCart([...auth?.cart])
    dispatch(updatedUser({
      cart: auth?.cart
    }))
  }
  const handleAdd = (i) => {
    if (auth?.cart[i].quantity >= 50) {
      window.alert('Quantity need to be less than 50')
      return
    } else {
      auth.cart[i].quantity += 1;
      auth.setCart([...auth?.cart])
      dispatch(updatedUser({
        cart: auth?.cart
      }))
    }
  }
  const handleMinus = (i) => {
    if (auth?.cart[i].quantity === 1) {
      window.alert('Quantity need to be more than 0')
      return
    } else {
      auth.cart[i].quantity -= 1;
      auth.setCart([...auth?.cart])
      dispatch(updatedUser({
        cart: auth?.cart
      }))
    }
  }
  const tranSuccess = async (payment) => {
    dispatch(createPayment({
      cart: auth?.cart,
      address: payment.address,
      paymentId: payment.paymentID
    }))
    auth.setCart([])
    dispatch(updatedUser({
      cart: []
    }))
  }
  return (
    <>
      <Grid container sx={{ marginTop: '20px' }}>
        {
          auth?.cart?.map((product, i) => {
            return (
              <Grid item key={i} xs={12}>
                <Container>
                  <Container sx={{ padding: { xs: '20px', md: '50px', lg: '50px' }, borderRadius: '15px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center' }} elevation={6}>
                    <Grid container spacing={{ xs: 1, sm: 9 }}>
                      <Grid item xs={12} sm={7}>
                        <CardMedia component='img' sx={{ width: '100%', objectFit: 'cover', maxHeight: '700px' }} image={product?.images?.url} alt={product?.title} />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <div className='box-detail'>
                          <div className="row">
                            <h2>{`${product?.title.charAt(0).toUpperCase()}${product?.title?.slice(1)}`}</h2>
                          </div>
                          <span>$ {product?.price * product?.quantity}</span>
                          <p>{product?.description}</p>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                            <div className='amount'>
                              <button onClick={() => {
                                handleMinus(i)
                              }}> - </button>
                              <span>{product?.quantity}</span>
                              <button onClick={() => {
                                handleAdd(i)

                              }}> + </button>
                            </div>

                            <Button component={Link} to={`/products/${product?._id}`} variant='contained' color='primary' fullWidth sx={{
                              fontWeight: 'bold',
                            }} onClick={() => {
                            }} >View Details</Button>

                            <Button variant='contained' color='error' fullWidth sx={{
                              fontWeight: 'bold',
                            }} onClick={() => {
                              handleDelete(product?._id)
                            }} >Delete</Button>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Container>
                </Container >
              </Grid>
            )
          })
        }
      </Grid>
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
        <Typography variant='h6'>Total: ${total}</Typography>
        <PayPal total={total} tranSuccess={tranSuccess} />
      </Container>
    </>
  )
}

export default Cart