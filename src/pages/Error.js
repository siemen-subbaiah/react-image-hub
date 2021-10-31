import { Button, Container, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Container sx={{ my: '3rem' }}>
      <Typography variant='h4' textAlign='center'>
        404, you hit the wrong route.
      </Typography>
      <Link
        to='/'
        style={{
          textDecoration: 'none',
          display: 'flex',
          justifyContent: 'center',
          margin: '1rem 0',
        }}
      >
        <Button color='primary' variant='contained'>
          Home
        </Button>
      </Link>
    </Container>
  );
};

export default Error;
