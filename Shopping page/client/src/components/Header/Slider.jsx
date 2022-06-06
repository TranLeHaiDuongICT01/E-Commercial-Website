import React from 'react'
import { Box, Modal, Backdrop, Fade,IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import NavLinks from './NavLinks'
const style = {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    bgcolor: '#232a34',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '250px',
    width: '100%',

};
const Slider = (props) => {
    return (
        <Modal disableScrollLock={true}
            open={props.openModal}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }} sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Fade in={props.openModal}>
                <Box sx={{ ...style }}>
                    <IconButton sx={{ top: 0, right: 0, color: 'white', position: 'fixed' }} onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <NavLinks slide />
                </Box>
            </Fade>
        </Modal>
    )
}

export default Slider