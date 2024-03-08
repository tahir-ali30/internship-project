import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import signUpSchema from '../FormSchemas/signUpSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import userAuthFetch from '../lib/userAuthFetch';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setUserData } from '../app/states/user/userSlice';

const defaultTheme = createTheme();

export default function SignUp() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      signUpSchema.safeParse(data);
      data.join = 1;

      const { error, message,  ...response } = await toast.promise(userAuthFetch('register', 'POST', data), {
        pending: 'Signing Up...'
      })

      if (!error) {
        toast.success("Successfully signed up!", { autoClose: 1500 });
        const { token, data: { account } } = response;
        dispatch(setUserData({ account, token }));
        navigator('/otp');
      } else {
        throw new Error(message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('first_name')}
                  autoComplete="given-name"
                  name="first_name"
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                />
                {errors.first_name && 
                  <p className='text-red-400'>{errors.first_name.message}</p>
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register('last_name')}
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
                {errors.last_name && 
                  <p className='text-red-400'>{errors.last_name.message}</p>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('phone')}
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete=""
                />
                {errors.phone && 
                  <p className='text-red-400'>{errors.phone.message}</p>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                {errors.email && 
                  <p className='text-red-400'>{errors.email.message}</p>
                }
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && 
                  <p className='text-red-400'>{errors.password.message}</p>
                }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" className='underline'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}