import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, Container, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '30px 20px 20px 20px'
};

const ModalMessage = ({ handleClose, open }) => {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                disableScrollLock={true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            You haven't logged in yet.
                        </Typography>
                        <Container sx={{ marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
                            <Stack spacing={2} direction='row'>
                                <Button variant='contained' onClick={handleClose}>Cancel</Button>
                                <Button component={Link} to='/auth' variant='contained'>Login</Button>
                            </Stack>
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalMessage