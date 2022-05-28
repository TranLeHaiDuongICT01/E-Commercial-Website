import React, { useContext, useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { IconButton, AppBar, Toolbar, Box, Avatar, Typography, Tooltip, Menu, MenuItem, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
// import Slider from './Slider';
import { deepPurple } from '@mui/material/colors'
import { getUserInfo } from '../action/auth';
import { AuthContext } from '../context/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import Slider from './Slider';
import NavLinks from './NavLinks';
const StyledMenuItem = styled(MenuItem)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
})

const Header = () => {
    const { token } = useContext(AuthContext)
    const { userInfo } = useSelector(state => state?.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        if (token) {
            dispatch(getUserInfo())
        }
    }, [token, dispatch])

    const [anchorElUser, setAnchorElUser] = useState(null)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [openModal, setOpenModal] = useState(false)
    const handleOpen = () => {
        setOpenModal(true)
    }
    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <>
            <Slider openModal={openModal} handleClose={handleClose} />
            <AppBar position='sticky'>
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton sx={{ display: { xs: 'block', md: 'none' } }} onClick={handleOpen}>
                        <MenuIcon />
                    </IconButton>

                    <Box component={Link} to='/' sx={{ display: 'flex', flexDirection: 'row', textDecoration: 'none', color: 'white', alignItems: 'center' }}>
                        <AdbIcon sx={{ fontSize: '30px', paddingRight: '5px' }} />
                        <Typography variant='h6'>Admin Home Page</Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <NavLinks />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header