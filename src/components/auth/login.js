import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';

const loginUser = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:3005/api/user/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error('Invalid username or password');
    }
};

const LoginForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation(loginUser, {
        onSuccess: (data) => {
            if (data?.status === "success") {
                localStorage.setItem("Token", data?.token);
                queryClient.invalidateQueries('user');
                navigate("/");
            }
        }
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='Login_page'>
                    <h1>Login Form</h1>
                    <TextField fullWidth label="Email" id="email" {...register('email', { required: 'Email is required' })} />


                    {errors.email && <p className='Error_msg'>{errors.email.message}</p>}
                    <br />
                    <TextField fullWidth margin="normal" label="Password" type="password" id="password" {...register('password', { required: 'Password is required' })} />
                    {errors.password && <p className='Error_msg'>{errors.password.message}</p>}
                    <br />
                    <Button fullWidth type="submit" variant="contained" disabled={mutation.isLoading}>
                        Login
                    </Button>
                    {mutation.isError && <p className='Error_msg'>{mutation.error.message}</p>}
                </div>
            </form>
        </Container>
    );
};

export default LoginForm;
