import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import FormComp from '../components/utility/FormComp';

const Landing = () => {
  const matches = useMediaQuery('(max-width:600px)');

  const styles = {
    lineHeight: '1.5',
    width: matches ? 'initial' : '90%',
  };

  return (
    <Container sx={{ my: matches ? '5rem' : '10rem' }}>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Typography component='h1' variant='h3' sx={styles}>
            Having Trouble to get links for local <b>images</b>?
          </Typography>
          <Typography sx={{ my: '1rem', fontSize: '1.4rem' }}>
            Upload images from your computer and get instant links.
          </Typography>
        </Grid>
        <Grid item lg={6} xs={12}>
          <FormComp />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;
