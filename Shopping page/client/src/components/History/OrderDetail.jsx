import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth-context'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserHistory } from '../../action/payment'
import { Button, Container, Typography } from '@mui/material'
const OrderDetail = () => {
    const location = useLocation()
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { payment } = useSelector(state => state.payment)
    useEffect(() => {
        if (auth?.token) dispatch(getUserHistory())
    }, [auth?.userId, location, auth?.token, dispatch])
    if (!auth?.token) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <Button component={Link} to='/login' variant='contained'>Login first</Button>
            </Container>
        )
    }
    const order = payment?.filter(item => item._id === id)[0]
    // console.log(order);
    let total = 0
    return (
        payment?.length > 0 && order?._id ? (
            <Container className='container-history' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <Typography variant='h4'>Order Details</Typography>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Postal Code</th>
                                <th>Country Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order?.address?.recipient_name}</td>
                                <td>{order?.address?.line1} - {order?.address?.city}</td>
                                <td>{order?.address?.postal_code}</td>
                                <td>{order?.address?.country_code}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table style={{marginTop: '30px'}}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order?.cart?.map((item, i) => {
                                    total += item.price * item.quantity
                                    return (
                                        <tr key={i}>
                                            <td><img style={{width: '80px', height: '80px', objectFit:'cover'}} src={item.images.url} alt={item.title} /></td>
                                            <td>{item.title}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan="4">Total = ${total}</td>
                            </tr>
                        </tbody>
                    </table>

                </Container>
            </Container>
        ) : (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', gap: '10px', flexDirection: 'column' }}>
                <Typography>Invalid Order ID</Typography>
            </Container>
        )
    )
}

export default OrderDetail