import React, { useContext, useState } from 'react'
import { Container, Grid, Typography, CardMedia, Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'
import ModalMessage from '../Modal/ModalMessage'
import './productDetails.css'
import { AuthContext } from '../../context/auth-context'
const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams()
  const { products } = useSelector(state => state.products)
  const product = products?.filter(product => product._id === id)[0]
  const auth = useContext(AuthContext)
  const HandleAddToCart = () => {
    if (!auth?.token) {
      handleOpen()
    }
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
                }} component={Link} to='/cart' className='cart'>Buy Now</Button>
              </div>
              <ModalMessage handleClose={handleClose} open={open} />
            </div>

          </Grid>
        </Grid>
      </Container>
    </Container >
  )
}

export default ProductDetails