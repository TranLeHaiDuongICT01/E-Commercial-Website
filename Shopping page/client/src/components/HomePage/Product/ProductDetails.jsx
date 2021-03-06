import React, { useContext, useState } from 'react'
import { Container, Grid, Typography, CardMedia, Button } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updatedUser } from '../../../action/auth'
import ProductItem from './ProductItem'
import ModalMessage from '../../Modal/ModalMessage'
import { AuthContext } from '../../../context/auth-context'
const ProductDetails = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams()
  const { products } = useSelector(state => state.products)
  const product = products?.filter(product => product._id === id)[0]
  const relatedProducts = products?.filter(item => item.category === product.category && item._id !== id)
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const HandleAddToCart = () => {
    if (!auth?.token) {
      handleOpen()
    }
    const check = auth?.cart.every(item => {
      return item._id !== product._id
    })

    if (check) {
      auth?.setCart([...auth?.cart, { ...product, quantity: 1 }])
      dispatch(updatedUser({
        cart: [...auth?.cart, { ...product, quantity: 1 }]
      }))
    } else {
      window.alert('This product has been added to cart')
    }
  }
  const handleBuyNow = () => {
    const check = auth?.cart.every(item => {
      return item._id !== product._id
    })

    if (check) {
      auth?.setCart([...auth?.cart, { ...product, quantity: 1 }])
      dispatch(updatedUser({
        cart: [...auth?.cart, { ...product, quantity: 1 }]
      }))
    }
    navigate('/cart')
  }
  return (
    product &&
    <Container>
      <Container sx={{ padding: { xs: '20px', md: '50px', lg: '150px' }, borderRadius: '15px', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center' }} elevation={6}>
        <Grid container spacing={{ xs: 1, sm: 9 }}>
          <Grid item xs={12} sm={7}>
            <CardMedia component='img' sx={{ width: '100%', objectFit: 'cover', maxHeight: '700px' }} image={product?.images?.url} alt={product?.title} />
          </Grid>
          <Grid item xs={12} sm={5}>
            <div className='box-detail'>
              <div className="row">
                <h2>{`${product?.title.charAt(0).toUpperCase()}${product?.title?.slice(1)}`}</h2>
              </div>
              <span>$ {product?.price}</span>
              <p>{product?.description}</p>
              <p variant='h6'>Sold: {product?.sold}</p>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <Button fullWidth sx={{
                  background: 'black',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: '#ccc',
                    color: 'black'
                  }
                }} onClick={HandleAddToCart} className='cart'>Add To Cart</Button>

                <Button fullWidth sx={{
                  background: 'black',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: '#ccc',
                    color: 'black'
                  }
                }} onClick={handleBuyNow} className='cart'>Buy Now</Button>
              </div>
              <ModalMessage handleClose={handleClose} open={open} />
            </div>

          </Grid>
        </Grid>
      </Container>
      <Container>
        <Typography variant='h5'>Related Products</Typography>
        <Grid container spacing={3} sx={{ marginBottom: '20px', marginTop: '5px' }}>
          {
            relatedProducts?.map(product => (
              <ProductItem key={product._id} product={product} />
            ))
          }
        </Grid>
      </Container>
    </Container >
  )
}

export default ProductDetails