import React, { useContext, useState } from 'react'
import {
    Grid, Card, CardMedia, IconButton,
    CardContent, Typography, Paper, CardActions, Button, Tooltip
} from '@mui/material'
import { Link } from 'react-router-dom'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import ModalMessage from '../../Modal/ModalMessage';
import { AuthContext } from '../../../context/auth-context';
import { updateProduct } from '../../../action/products'
import { useDispatch, useSelector } from 'react-redux';
const ProductItem = ({ product }) => {
    const auth = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAddToCart = async () => {
        if (!auth?.token) {
            handleOpen()
        }
        const check = auth?.cart.every(item => {
            return item._id !== product._id
        })

        if (check) {
            await auth?.setCart([...auth?.cart, { ...product, quantity: 1 }])
        } else {
            window.alert('This product has been added to cart')
        }



    }

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
                        <Typography sx={{ marginTop: '10px' }} variant='body2' color='text.secondary'>
                            {product.content}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Tooltip title='View more'>
                            <IconButton aria-label='Add to favourite' component={Link} to={`/products/${product._id}`}>
                                <MoreHorizIcon />
                            </IconButton>
                        </Tooltip>
                        <Button startIcon={<AddIcon />} onClick={handleAddToCart} variant='outlined'>Add to cart</Button>
                    </CardActions>
                    <ModalMessage handleClose={handleClose} open={open} />
                </Card>
            </Paper>
        </Grid>
    )
}

export default ProductItem