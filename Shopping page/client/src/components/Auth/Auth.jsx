import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../../context/auth-context'
import { login, register } from '../../action/auth'
import { useNavigate } from 'react-router-dom'
import { Container, Paper, Avatar, Typography, Grid, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Input from './Input'
const Auth = () => {
    const initialState = {
        name: '', email: '',
        password: ''
    }
    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isRegister, setIsRegister] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let userData
        if (isRegister) {
            if (formData.name.length === 0 || formData.email.length === 0 || formData.password.length < 6) {
                window.alert('Please fill all the fields')
                return
            }

            userData = await dispatch(register(formData, navigate))
        } else {
            if (formData.email.length === 0 || formData.password.length < 6) {
                window.alert('Please fill all the fields')
                return
            }

            userData = await dispatch(login(formData, navigate))
        }

        auth.login(userData.user, userData.accessToken, userData.cart)
    }
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const switchMode = () => {
        setIsRegister(!isRegister)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }} elevation={3}>
                <Avatar sx={{ margin: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isRegister ? 'Sign up' : 'Sign in'}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isRegister &&
                            <>
                                <Input name='name' type='text' label='Name' onChange={handleChange} autoFocus fullWidth />
                            </>
                        }
                        <Input name='email' label='Email' onChange={handleChange} type='email' />
                        <Input name='password' label='Password' onChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                    </Grid>
                    <Button sx={{ marginTop: 2 }} type='submit' onClick={handleSubmit} fullWidth variant='contained' color='primary'>
                        {
                            isRegister ? 'Sign up' : 'Sign in'
                        }
                    </Button>
                    {/* <GoogleLogin fullWidth
                        clientId='694830871542-d8ggebospri9avtnpi995163epoe0d7d.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary'
                                fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}
                                startIcon={<Icon />} variant='contained'
                            >Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    <Grid sx={{ marginTop: 2 }} container justifyContent='flex-end'>
                        <Grid>
                            <Button onClick={switchMode}>{
                                isRegister ? 'Already have an account? Sign in' :
                                    "Don't have an account? Sign up"
                            }</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth