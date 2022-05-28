import React, { useContext, useEffect } from 'react'
import { Box, Button, styled } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { logout, getUserInfo } from '../action/auth';
import { useDispatch, useSelector } from 'react-redux';
const NavLinks = (props) => {
    const { userInfo } = useSelector(state => state?.auth)
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    const StyledButton = styled(Button)({
        color: 'white',
        transition: '0.5s',
        '&:hover': {
            color: '#ccc'
        },
        fontSize: '12px',
        padding: 6,
        width: props.slide ? '100%' : '',
        justifyContent: 'flex-start',
        backgroundColor: props.slide ? 'green' : '',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    })
    const handleLogout = () => {
        dispatch(logout(navigate))
        auth.logout()
    }
    useEffect(() => {
        if (auth?.token) {
            dispatch(getUserInfo())
        }
    }, [auth])
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            {
                !auth?.token ?
                    <>
                        <StyledButton component={Link} to='/login' variant="outlined">Login</StyledButton>
                    </>
                    :
                    <>
                        <StyledButton component={Link} to='/' variant="outlined">Home</StyledButton >
                        <StyledButton component={Link} to='/createProduct' variant="outlined">Create Product</StyledButton >
                        <StyledButton component={Link} to='/categories' variant="outlined">Categories</StyledButton>
                        <StyledButton component={Link} to='/history' variant="outlined">History</StyledButton>
                        <StyledButton variant="outlined" onClick={handleLogout}>Logout</StyledButton>
                    </>
            }
        </Box>
    )
}

export default NavLinks