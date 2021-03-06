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
import { useDispatch } from 'react-redux';
import { updatedUser } from '../../../action/auth';
const ProductItem = ({ product }) => {
    const dispatch = useDispatch()
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
            auth?.setCart([...auth?.cart, { ...product, quantity: 1 }])
            dispatch(updatedUser({
                cart: [...auth?.cart, { ...product, quantity: 1 }]
            }))
        } else {
            window.alert('This product has been added to cart')
        }
    }

    return (
        <Grid item xs={12} sm={6} lg={4} style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            // minHeight: '500px'
        }}>
            <ModalMessage handleClose={handleClose} open={open} />
            <Paper elevation={6} sx={{ height: '100%' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardMedia component='img' sx={{ height: '300px', objectFit: 'cover' }} image={product.images.url} alt={product.title} />
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant='h5' fontSize='18px' fontWeight='bold'>{`${product.title.charAt(0).toUpperCase()}${product.title.slice(1)}`}</Typography>
                            <Typography variant='subtitle2' color='primary' fontSize='13px'>$ {product.price}</Typography>
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

                </Card>
            </Paper>
        </Grid>
    )
}

export default ProductItem