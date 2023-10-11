import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const SignupForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const signupMutation = useMutation(
        async (data) => {
            try {
                const response = await axios.post('http://localhost:3005/api/user/signup', data);
                return response.data;
            } catch (error) {
                throw new Error('Invalid username or password');
            }
        },
        {
            onSuccess: (data) => {
                if (data?.status === "success") {
                    localStorage.setItem("Token", data?.token);
                    queryClient.invalidateQueries('user');
                    navigate('/');
                } else {
                    setError('apiError', {
                        type: 'manual',
                        message: 'Invalid username or password',
                    });
                }
            }
        }
    );

    const onSubmit = (data) => {
        signupMutation.mutate(data);
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=''>
                    <h1>Signup Form</h1>
                    <TextField
                        label='First Name'
                        id='firstName'
                        {...register('firstName', { required: 'First Name is required' })}
                        fullWidth
                        margin='normal'
                    />
                    {errors.firstName && <Typography color='error'>{errors.firstName.message}</Typography>}

                    <TextField
                        label='Last Name'
                        id='lastName'
                        {...register('lastName', { required: 'Last Name is required' })}
                        fullWidth
                        margin='normal'
                    />
                    {errors.lastName && <Typography color='error'>{errors.lastName.message}</Typography>}

                    <TextField
                        id='DOB'
                        type='date'
                        {...register('DOB', { required: 'Date of Birth is required' })}
                        fullWidth
                        margin='normal'
                    />
                    {errors.DOB && <Typography color='error'>{errors.DOB.message}</Typography>}

                    <TextField
                        label='Phone Number'
                        id='mobile'
                        type='tel'
                        {...register('mobile', { required: 'Phone Number is required' })}
                        fullWidth
                        margin='normal'
                    />
                    {errors.mobile && <Typography color='error'>{errors.mobile.message}</Typography>}

                    <TextField
                        label='Email'
                        id='username'
                        type='email'
                        {...register('email', { required: 'Email is required' })}
                        fullWidth
                        margin='normal'
                    />
                    {errors.email && <Typography color='error'>{errors.email.message}</Typography>}

                    <TextField
                        label='Password'
                        id='password'
                        type='password'
                        {...register('password', { required: 'Password is required' })}
                        fullWidth
                        margin='normal'
                    />
                    {errors.password && <Typography color='error'>{errors.password.message}</Typography>}

                    <Button type='submit' variant='contained' disabled={signupMutation.isLoading} fullWidth>
                        SignUp
                    </Button>
                </div>
                {signupMutation.isError && <Typography color='error'>{signupMutation.error.message}</Typography>}
                {errors.apiError && <Typography color='error'>{errors.apiError.message}</Typography>}
            </form>
        </Container>
    );
};

export default SignupForm;






