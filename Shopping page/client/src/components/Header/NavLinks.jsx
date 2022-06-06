import React, { useContext, useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Box, Button, styled, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShopIcon from '@mui/icons-material/Shop';
import { AuthContext } from '../../context/auth-context';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout, getUserInfo } from '../../action/auth';
import { useDispatch } from 'react-redux';
const NavLinks = (props) => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()
    const StyledButton = styled(Button)({
        color: 'white',
        transition: '0.5s',
        '&:hover': {
            color: '#ccc',
            backgroundColor: props.slide ? '#232a34' : '',
            border: props.slide ? '1px solid #232a34' : '',
        },
        fontSize: '12px',
        padding: 6,
        width: props.slide ? '100%' : '',
        justifyContent: 'flex-start',
        backgroundColor: props.slide ? '#232a34' : '',
        variant: 'contained',
        border: props.slide ? '1px solid #232a34' : '',
    })
    const handleLogout = () => {
        dispatch(logout(navigate))
        auth.logout()
    }
    useEffect(() => {
        if (auth?.token) {
            dispatch(getUserInfo())
        }
    }, [auth, dispatch])
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: props.slide ? '20px' : '10px'}}>
            <IconButton component={Link} to='/cart'>
                <Tooltip title='Cart'>
                    <Badge badgeContent={auth?.cart ? `${auth?.cart.length}` : '0'} color='error'>
                        <ShoppingCartIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
            </IconButton>

            <StyledButton component={Link} to='/products' startIcon={<ShopIcon />} variant="outlined">Products</StyledButton>

            {
                !auth?.token ?
                    <>
                        <StyledButton component={Link} to='/login' startIcon={<LoginIcon />} variant="outlined">Login</StyledButton>
                        <StyledButton component={Link} to='/register' startIcon={<HowToRegIcon />} variant="outlined">Register</StyledButton>
                    </>
                    :
                    <StyledButton startIcon={<LogoutIcon />} variant="outlined" onClick={handleLogout}>Logout</StyledButton>
            }
        </Box>
    )
}

export default NavLinks