import { Button, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
const Cart = () => {
  const auth = useContext(AuthContext)
  if (auth?.cart.length === 0) {
    return <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>Cart Empty</h2>
      <Button component={Link} to='/' variant='contained' sx={{ width: '200px' }}>Continue Shopping</Button>
    </Container>
  }
  const handleDelete = () => {

  }
  let total = 0
  return (
    <>
      <Grid container sx={{ marginTop: '20px' }}>
        {
          auth?.cart?.map((product, i) => {
            total += product?.price * product?.quantity
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
                              <button> - </button>
                              <span>{product?.quantity}</span>
                              <button> + </button>
                            </div>
                            <Button fullWidth sx={{
                              background: 'black',
                              color: 'white',
                              fontWeight: 'bold',
                              '&:hover': {
                                background: '#ccc',
                                color: 'black'
                              }
                            }} onClick={handleDelete} >Delete</Button>
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
      <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
        <Typography variant='h6'>Total: ${total}</Typography>
        <Button variant='contained'>Buy now</Button>
      </Container>
    </>
  )
}

export default Cart