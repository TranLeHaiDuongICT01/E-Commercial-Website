import { Container, TextField, Button, Typography, TableRow, Col, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, createCategory } from '../action/categories'
const Categories = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)
  const [category, setCategory] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name.toLowerCase() === category.toLowerCase()) {
        window.alert('The category already exists')
        return
      }
    }

    dispatch(createCategory({ name: category }))

  }
  return (
    <Container sx={{ marginTop: '20px', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <Typography variant='h6'>Create new category</Typography>
        <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>
          <TextField type='text' label='Category' name='category'
            value={category} required onChange={(e) => setCategory(e.target.value)} />
          <Button sx={{ fontSize: '13px' }} variant='contained' type='submit'>Save</Button>
        </form>
      </Container>

      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px', justifyContent: 'space-between' }}>
        {
          categories?.map(category => (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '280px', width: '100%', padding: 1 }} key={category._id}>
              <Typography sx={{ fontSize: '13px' }}>{category?.name}</Typography>
              <Container sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button sx={{ fontSize: '13px' }} variant='contained' color='primary'>Edit</Button>
                <Button sx={{ fontSize: '13px' }} variant='contained' color='error'>Delete</Button>
              </Container>
            </Box>
          ))
        }
      </Container>

    </Container>
  )
}

export default Categories