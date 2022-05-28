import React from 'react'
import { Container, Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import ProductItem from './Product/ProductItem'
const HomePage = () => {
    const { products } = useSelector(state => state.products)
    return (
        <Container sx={{ marginBottom: '20px' }}>
            <Grid container spacing={4} sx={{ marginTop: '7px' }}>
                {products?.map((product, i) => (
                    <ProductItem key={i} product={product} />
                ))}
            </Grid>
        </Container>
    )
}

export default HomePage