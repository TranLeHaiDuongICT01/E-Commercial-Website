import React, { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { IconButton, AppBar, Toolbar, Box, Avatar, Typography, Tooltip, Menu, MenuItem, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NavLinks from './NavLinks';
import Slider from './Slider';

const StyledMenuItem = styled(MenuItem)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
})

const Header = () => {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [openModal, setOpenModal] = useState(false)
    const value = useContext(GlobalState)
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
                    <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={handleOpen}>
                        <MenuIcon />
                    </IconButton>

                    <Box component={Link} to='/' sx={{ display: 'flex', flexDirection: 'row', textDecoration: 'none', color: 'white', alignItems: 'center' }}>
                        <AdbIcon sx={{ fontSize: '30px', paddingRight: '5px' }} />
                        <Typography variant='h6'>ShoppingMall</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <NavLinks />
                        </Box>

                        <Box>
                            <Tooltip title='Account settings' onClick={handleOpenUserMenu}>
                                <IconButton>
                                    <Avatar alt='Jennifer Lawrence' src='https://nld.mediacdn.vn/thumb_w/540/2014/Jennifer-Lawrence-promoting-Mockingjay-Part-1-in-Cannes-2014-640x447-126dc.jpg' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                disableScrollLock={true}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <StyledMenuItem onClick={handleCloseUserMenu}>
                                    <IconButton>
                                        <AccountCircleIcon />
                                    </IconButton>
                                    <Typography textAlign='center'>Accounts</Typography>
                                </StyledMenuItem>

                                <StyledMenuItem onClick={handleCloseUserMenu}>
                                    <IconButton>
                                        <SettingsIcon />
                                    </IconButton>
                                    <Typography textAlign='center'>Setting</Typography>
                                </StyledMenuItem>

                                <StyledMenuItem onClick={handleCloseUserMenu}>
                                    <IconButton>
                                        <LogoutIcon />
                                    </IconButton>
                                    <Typography textAlign='center'>Logout</Typography>
                                </StyledMenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header