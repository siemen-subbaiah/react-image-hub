import { Avatar, Container, Grid, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import AccountImages from '../components/account/AccountImages';
import { AuthContext } from '../context/auth/AuthState';
import useMediaQuery from '@mui/material/useMediaQuery';

const Account = () => {
  const matches = useMediaQuery('(max-width:600px)');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => setOpen(false);

  const { user } = useContext(AuthContext);
  return (
    <div style={{ backgroundColor: '#FAFAFA' }}>
      <Container sx={{ my: '5rem' }}>
        <Grid
          container
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
          <Grid item lg={6} xs={12}>
            <Avatar
              sx={{
                backgroundColor: '#29AEFA',
                width: matches ? 80 : 120,
                height: matches ? 80 : 120,
                fontSize: matches ? '2.5rem' : '4rem',
              }}
            >
              {user?.user?.username[0].toUpperCase()}
            </Avatar>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography component='h1' variant='h4'>
              {user?.user?.username}
            </Typography>
            <Typography>{user?.user?.email}</Typography>
          </Grid>
        </Grid>
        <hr style={{ marginTop: matches ? '2rem' : '5rem' }} />
        <AccountImages />
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={handleClose}
          message='Tap on the images to get links'
          autoHideDuration={2000}
        />
      </Container>
    </div>
  );
};

export default Account;
