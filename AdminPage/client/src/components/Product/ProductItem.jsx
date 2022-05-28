import React, { useContext, useState } from 'react'
import {
    Grid, Card, CardMedia,
    CardContent, Typography, Paper, CardActions, Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import ModalMessage from '../Modal/ModalMessage';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../context/auth-context';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../action/products'
const ProductItem = ({ product }) => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleDelete = () => {
        if (!auth?.token) {
            handleOpen()
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
                        <Button startIcon={<EditIcon />} component={Link} to={`/edit/${product._id}`} variant='outlined'>Edit</Button>
                        <Button startIcon={<DeleteIcon />} color='error' onClick={handleDelete} variant='outlined'>Delete</Button>
                    </CardActions>
                    <ModalMessage handleClose={handleClose} open={open} />
                </Card>
            </Paper>
        </Grid>
    )
}

export default ProductItem