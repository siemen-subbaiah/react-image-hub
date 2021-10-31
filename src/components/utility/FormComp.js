import { Alert, Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../context/auth/AuthState';

const FormComp = () => {
  const styles = {
    backgroundColor: '#fff',
    padding: '1.5rem',
    boxShadow: '10px 10px 30px rgb(0 0 0 / 10%)',
  };

  const [toggle, setToggle] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { signup, login, loading, isError, errorText } =
    useContext(AuthContext);

  // SIGNUP!
  const handleSignUp = (e) => {
    e.preventDefault();
    if (name && email && password) {
      signup(name, email, password);
    } else {
      alert('Enter all the fields!');
    }
  };

  // LOGIN!
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email, password);
    } else {
      alert('Enter all the fields!');
    }
  };

  return (
    <Box sx={styles}>
      {isError && (
        <Alert sx={{ my: '1rem' }} severity='error'>
          {errorText}
        </Alert>
      )}
      {toggle ? (
        <form onSubmit={handleLogin}>
          <TextField
            label='Email'
            variant='outlined'
            color='primary'
            margin='normal'
            fullWidth
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            variant='outlined'
            color='primary'
            margin='normal'
            fullWidth
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            color='primary'
            variant='contained'
            fullWidth
            disabled={loading}
            sx={{ my: '0.5rem' }}
          >
            Login
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSignUp}>
          <TextField
            label='Name'
            variant='outlined'
            color='primary'
            fullWidth
            name='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label='Email'
            variant='outlined'
            color='primary'
            margin='normal'
            fullWidth
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            variant='outlined'
            color='primary'
            margin='normal'
            fullWidth
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            color='primary'
            variant='contained'
            fullWidth
            type='submit'
            sx={{ my: '0.5rem' }}
            disabled={loading}
          >
            Signup
          </Button>
        </form>
      )}
      {toggle ? (
        <Typography sx={{ textAlign: 'center' }}>
          Do not an account?{' '}
          <span
            onClick={() => setToggle(false)}
            style={{ color: '#29AEFA', cursor: 'pointer' }}
          >
            Signup
          </span>
        </Typography>
      ) : (
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <span
            onClick={() => setToggle(true)}
            style={{ color: '#29AEFA', cursor: 'pointer' }}
          >
            Login
          </span>
        </Typography>
      )}
    </Box>
  );
};

export default FormComp;
