import React, { useEffect, useContext } from 'react'
import { Container, Grid, CardActions, Paper, TextField, Typography, CardMedia, Button } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalState } from '../../../GlobalState.js'
import ProductItem from './ProductItem'
import './productDetails.css'
const ProductDetails = () => {
  const { id } = useParams()
  const { products } = useSelector(state => state.products)
  const product = products?.filter(product => product._id === id)[0]
  const state = useContext(GlobalState)
  const relatedProducts = products?.filter(item => item.category === product.category && item._id !== id)
  console.log(relatedProducts);
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
                }} component={Link} to='/cart' className='cart'>Add To Cart</Button>

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
            </div>

          </Grid>
        </Grid>
      </Container>
      <Container>
        <Typography variant='h5'>Related Products</Typography>
        <Grid container spacing={3} sx={{marginBottom: '20px', marginTop: '5px'}}>
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