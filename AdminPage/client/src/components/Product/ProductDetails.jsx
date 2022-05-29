import { Box, Button, CardMedia, Container, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProduct } from '../../action/products'
const ProductDetails = () => {
  const { id } = useParams()
  const { products, isLoading } = useSelector(state => state.products)
  const product = products?.filter(product => product._id === id)[0]
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)
  const [data, setData] = useState({
    title: '',
    price: '',
    description: '',
    content: '',
    category: '',
    images: ''
  })
  useEffect(() => {
    setData({
      title: product?.title || '',
      price: product?.price || '',
      description: product?.description || '',
      content: product?.content || '',
      category: product?.category || ''
    })
  }, [product])
  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(updateProduct(id, data))
    window.alert('Update product successfully')
    // handleReset()
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleReset = (e) => {
    if (e) e.preventDefault()
    setData(product)
  }
  if (isLoading) {
    return <CircularProgress />
  }
  return (
    product &&
    <Container sx={{ marginTop: '20px' }}>
      <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px', padding: '20px' }}>
        <Typography variant='h5'>Edit Product</Typography>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit} component={FormControl} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '20px'
          }}>
            <TextField name="title" variant='outlined' label='Title' fullWidth={true} value={data.title} onChange={handleChange} required />
            <TextField className='price-input' type='number' name="price" variant='outlined' label='Price(Number only)' fullWidth={true} value={data.price} onChange={handleChange} required />
            <TextField multiline rows={4} name="description" variant='outlined' label='Description' fullWidth={true} value={data.description} onChange={handleChange} required />
            <TextField name="content" variant='outlined' label='Content' fullWidth={true} value={data.content} onChange={handleChange} required />

            <FormControl fullWidth={true}>
              <InputLabel id='input-category'>Category</InputLabel>
              <Select id="demo-simple-select" labelId='input-category' fullWidth value={data.category} name='category' label='Category' onChange={handleChange}>
                {
                  categories?.map((item) => (
                    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <div style={{ position: 'relative' }}>
              <CardMedia component='img' sx={{ width: '100%', objectFit: 'cover', maxHeight: '700px' }} id='imageSeen' image={product?.images?.url} alt='' />
            </div>
            <Button variant='contained' type='submit' color='primary' fullWidth>Submit</Button>
            <Button variant='contained' color='error' onClick={handleReset} fullWidth>Reset</Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default ProductDetails