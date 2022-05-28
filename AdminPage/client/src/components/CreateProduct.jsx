import { Box, Button, CardMedia, Container, FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
const CreateProduct = () => {
  const { categories } = useSelector(state => state.category)
  const [data, setData] = useState({
    title: '', price: '', description: '',
    content: '', images: '', category: ''
  })
  const [image, setImage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data);
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleChangeFile = async (e) => {
    e.preventDefault()
    const file = e.target?.files[0]
    if (!file) {
      document.getElementById('file_up').value = ''
      return window.alert('File does not exist')

    }
    if (file?.size > 1024 * 1024) {
      document.getElementById('file_up').value = ''
      return window.alert('File is too large')
    }
    if (file?.type !== 'image/jpg' && file?.type !== 'image/jpeg'
      && file?.type !== 'image/png') {
      document.getElementById('file_up').value = ''
      return window.alert('File is not an image')
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target.result)
    }

    reader.readAsDataURL(file)

  }
  const handleDeleteImage = (e) => {
    e.preventDefault()
    console.log("Delete file");
    setImage('')
    setData({ ...data, images: {} })
    document.getElementById('file_up').value = ''
  }
  return (
    <Container sx={{ marginTop: '20px' }}>
      <Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px', padding: '20px' }}>
        <Typography variant='h5'>Create Product</Typography>
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
              <CardMedia component='img' sx={{ width: '100%', objectFit: 'cover', maxHeight: '700px' }} id='imageSeen' image={image} alt='' />
              {image &&
                <button style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={handleDeleteImage}>X</button>
              }
            </div>
            <Input fullWidth disableUnderline type="file" name='file' id='file_up' onChange={handleChangeFile} required />
            <Button variant='contained' type='submit' color='primary' fullWidth>Submit</Button>
            <Button variant='contained' color='error' fullWidth>Clear</Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default CreateProduct