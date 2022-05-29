import React, { useEffect } from 'react'
import { Container, Grid, CircularProgress, Pagination, PaginationItem } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from './Product/ProductItem'
import { getProducts } from '../action/products'
import { Link, useLocation } from 'react-router-dom'
function useQuery() {
    return new URLSearchParams(useLocation().search)
}
const HomePage = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const query = useQuery()
    const page = query.get('page') || 1
    useEffect(() => {
        let queryObject = ''
        queryObject += `page=${page}`
        dispatch(getProducts(queryObject))
    }, [page, location])
    const { products, isLoading, numberOfPage } = useSelector(state => state.products)
    if (isLoading) {
        return <CircularProgress />
    }
    console.log(numberOfPage);
    return (
        <Container sx={{ marginBottom: '20px' }}>
            <Grid container spacing={4} sx={{ marginTop: '7px' }}>
                {products?.map((product, i) => (
                    <ProductItem key={i} product={product} />
                ))}
            </Grid>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '10px' }}>
                <Pagination count={numberOfPage} showFirstButton showLastButton page={Number(page) || 1}
                    renderItem={(item) => (
                        <PaginationItem {...item} component={Link} to={`?page=${item.page}`} />
                    )} />
            </Container>
        </Container>
    )
}

export default HomePage