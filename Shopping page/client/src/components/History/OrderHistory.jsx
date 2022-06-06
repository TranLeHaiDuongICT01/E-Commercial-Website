import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth-context'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserHistory } from '../../action/payment'
import { Button, CircularProgress, Container, Typography } from '@mui/material'
const OrderHistory = () => {
    const location = useLocation()
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    const { payment, isLoading } = useSelector(state => state.payment)
    useEffect(() => {
        if (auth?.token) dispatch(getUserHistory())
    }, [auth?.userId, location, auth?.token, dispatch])
    if (isLoading) return <CircularProgress />
    if (!auth?.token) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                <Button component={Link} to='/login' variant='contained'>Login first</Button>
            </Container>
        )
    }
    return (
        payment?.length > 0 ? (
            <Container className='container-history' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant='h4'>History</Typography>
                <Typography variant='h5'>You have {payment?.length} {payment?.length === 1 ? 'order' : 'orders'}</Typography>
                <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Date of Purchase</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payment?.map(item => (
                                    <tr key={item?._id}>
                                        <td>{item?.paymentId}</td>
                                        <td>{item?.createdAt.toLocaleString()}</td>
                                        <td><Link to={`/history/${item?._id}`}>View</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Container>
            </Container>
        ) : (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', gap: '10px', flexDirection: 'column' }}>
                <Typography>No order recently</Typography>
                <Button component={Link} to='/' variant='contained'>Go shopping</Button>
            </Container>
        )
    )
}

export default OrderHistory