import React, { useEffect, useState } from 'react'
import { Container, Grid, CircularProgress, TextField, Pagination, PaginationItem, Box, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from './Product/ProductItem'
import { getProducts } from '../action/products'
import { Link, useLocation, useNavigate } from 'react-router-dom'
function useQuery() {
    return new URLSearchParams(useLocation().search)
}
const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    let query = useQuery()
    let page = query?.get('page') || 1
    let category = query?.get('category') || ''
    let sort = query?.get('sort') || ''
    let titleQuery = query?.get('title') || ''
    const [title, setTitle] = useState(titleQuery || '')
    const [categoryFilter, setCategoryFilter] = useState(category || 'All')
    const [sortBy, setSortBy] = useState('')
    useEffect(() => {
        let queryObject = ''
        queryObject += `page=${page}`
        if (category && category?.length > 0)
            queryObject += `&category=${category}`
        if (sort && sort?.length > 0)
            queryObject += `&sort=${sort}`
        if (titleQuery && titleQuery?.length > 0)
            queryObject += `&title=${titleQuery}`

        dispatch(getProducts(queryObject))
    }, [page, location, dispatch, category, sort, titleQuery])
    const { products, isLoading, numberOfPage } = useSelector(state => state.products)
    const { categories } = useSelector(state => state.category)
    const handleChange = (e) => {
        setCategoryFilter(e.target.value)
    }
    const handleSort = (e) => {
        setSortBy(e.target.value)
    }
    const handleSearchTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleFilter = () => {
        let Query = '/'
        console.log(titleQuery);
        if (categoryFilter === 'All') {
            if (sortBy?.length > 0) {
                Query += `?${sortBy}`
                if (title?.length > 0) {
                    Query += `&title=${title}`
                }
            } else {
                if (title?.length > 0) {
                    Query += `?title=${title}`
                }
            }
        } else {
            Query += `?category=${categoryFilter}`
            if (sortBy?.length > 0) {
                Query += `&${sortBy}`
            }
            if (title?.length > 0) {
                Query += `&title=${title}`
            }
        }
        navigate(`${Query}`)
    }
    if (isLoading) {
        return <CircularProgress />
    }
    return (
        <Container sx={{ marginBottom: '20px', marginTop: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                <TextField name="title" variant='outlined' label='Title' fullWidth={true} value={title} onChange={handleSearchTitle} required />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryFilter}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value='All'>All</MenuItem>
                        {
                            categories?.map(item => (
                                <MenuItem key={item?._id} value={item?.name}>{item?.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select">Sort by</InputLabel>
                    <Select
                        labelId="demo-simple-select"
                        id="demo-simple"
                        value={sortBy}
                        label="Age"
                        onChange={handleSort}
                    >
                        <MenuItem value='sort=createdAt'>Oldest</MenuItem>
                        <MenuItem value='sort=-createdAt'>Newest</MenuItem>
                        <MenuItem value='sort=-sold'>Best sales</MenuItem>
                        <MenuItem value='sort=-price'>Price: High-Low</MenuItem>
                        <MenuItem value='sort=price'>Price: Low-High</MenuItem>

                    </Select>
                </FormControl>

                <Button onClick={handleFilter} variant='contained' color='primary'>Filter</Button>
            </Box>
            <Grid container spacing={4} sx={{ marginTop: '7px' }}>
                {products?.map((product, i) => (
                    <ProductItem key={i} product={product} />
                ))}
            </Grid>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '10px' }}>
                <Pagination count={numberOfPage} showFirstButton showLastButton page={Number(page) || 1}
                    renderItem={(item) => (
                        <PaginationItem {...item} component={Link} to={`?page=${item.page}${category && `&category=${category}`}${sort && `&sort=${sort}`}${titleQuery && `&title=${titleQuery}`}`} />
                    )} />
            </Container>
        </Container>
    )
}

export default HomePage