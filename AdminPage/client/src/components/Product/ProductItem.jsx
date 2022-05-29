import React, { useContext, useState } from 'react'
import {
    Grid, Card, CardMedia,
    CardContent, Typography, Paper, CardActions, Button
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ModalMessage from '../Modal/ModalMessage';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../context/auth-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../action/products'
import axios from 'axios'
import { baseURL } from '../../utils/globalPort';
const ProductItem = ({ product }) => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = () => {
        if (!auth?.token) {
            handleOpen()
            return
        }

        if (window.confirm('Are you sure to delete this product')) {
            dispatch(deleteProduct(product._id))
            axios.post(`${baseURL}/api/destroy`, { public_id: product?.images?.public_id }, {
                headers: {
                    Authorization: `Bearer ${auth?.token}`
                }
            })
        }

    }

    const handleEdit = () => {
        if (!auth?.token) {
            handleOpen()
            return
        }
        navigate(`/edit/${product._id}`)
    }

    return (
        <Grid item xs={12} sm={6} lg={4} style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}>
            <ModalMessage handleClose={handleClose} open={open} />
            <Paper elevation={6} sx={{ height: '100%' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardMedia component='img' sx={{ height: '200px', objectFit: 'cover' }} image={product.images.url} alt={product.title} />
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
                        <Button startIcon={<EditIcon />} onClick={handleEdit} variant='outlined'>Edit</Button>
                        <Button startIcon={<DeleteIcon />} color='error' onClick={handleDelete} variant='outlined'>Delete</Button>
                    </CardActions>
                </Card>
            </Paper>
        </Grid>
    )
}

export default ProductItem