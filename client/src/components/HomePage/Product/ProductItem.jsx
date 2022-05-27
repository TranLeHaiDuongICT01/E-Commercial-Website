import React from 'react'
import {
    Grid, Card, CardMedia, IconButton,
    CardContent, Typography, Paper, CardActions, Button, Tooltip
} from '@mui/material'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
const ProductItem = ({ product }) => {
    console.log(product.images.url);
    return (
        <Grid item xs={12} sm={6} lg={4} style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
            <Paper elevation={6}>
                <Card>
                    <CardMedia component='img' sx={{ height: '200px', objectFit: 'cover' }} image={product.images.url} alt={product.title} />
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h5' fontWeight='bold'>{`${product.title.charAt(0).toUpperCase()}${product.title.slice(1)}`}</Typography>
                            <Typography variant='subtitle2' color='primary' fontSize='20px'>$ {product.price}</Typography>
                        </div>
                        <Typography variant='body2' color='text.secondary'>
                            {product.content}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Tooltip title='View more'>
                            <IconButton aria-label='Add to favourite' component={Link} to={`/products/${product._id}`}>
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>

                        <Button startIcon={<AddIcon />} variant='outlined'>Add to cart</Button>

                    </CardActions>
                </Card>
            </Paper>
        </Grid>
    )
}

export default ProductItem