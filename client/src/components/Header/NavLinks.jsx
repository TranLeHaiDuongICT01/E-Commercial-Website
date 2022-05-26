import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton, Box, Button, styled, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ShopIcon from '@mui/icons-material/Shop';
const NavLinks = (props) => {
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
        backgroundColor: props.slide ? 'green' : ''
    })
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <IconButton component={Link} to='/cart'>
                <Tooltip title='Cart'>
                    <Badge badgeContent="0" color='error'>
                        <ShoppingCartIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
            </IconButton>

            <StyledButton component={Link} to='/products' startIcon={<ShopIcon />} variant="outlined">Products</StyledButton>

            <StyledButton component={Link} to='/login' startIcon={<LoginIcon />} variant="outlined">Login</StyledButton>

            <StyledButton component={Link} to='/register' startIcon={<HowToRegIcon />} variant="outlined">Register</StyledButton>
        </Box>
    )
}

export default NavLinks