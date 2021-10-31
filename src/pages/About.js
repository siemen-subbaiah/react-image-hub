import {
  Container,
  Grid,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import cloudinary from '../assets/images/cloudinary-logo.png';
import strapi from '../assets/images/strapi-logo.png';
import reactLogo from '../assets/images/react-logo.png';
import { Box } from '@mui/system';

const About = () => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <Container sx={{ my: '5rem' }}>
      <Typography>
        Finding places to get a quick link for the images which recide on your
        local computer? Try ImageHub and get links for your images in three
        steps
      </Typography>
      <List>
        <ListItem>
          <Typography>1. Do a quick Login/Signup</Typography>
        </ListItem>
        <ListItem>
          <Typography>2. Upload Images from computer</Typography>
        </ListItem>
        <ListItem>
          <Typography>3. Get links and share it to the world </Typography>
        </ListItem>
      </List>
      <hr />
      <Typography variant='h4' sx={{ textAlign: 'center', my: '1rem' }}>
        Tech Stack
      </Typography>

      <Box sx={{ my: '2rem' }}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item lg={6} xs={12}>
            <img
              src={reactLogo}
              alt='react-logo'
              style={{ height: matches ? '150px' : '300px' }}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography variant='h4' sx={{ my: '1rem' }}>
              Frontend - React
            </Typography>
            <Typography>
              React JS is a JavaScript library for building user interfaces
            </Typography>{' '}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: '5rem' }}>
        <Grid container justifyContent='flex-end' alignItems='center'>
          <Grid item lg={6} xs={12} order={{ xs: 2, lg: 1 }}>
            <Typography variant='h4' sx={{ my: '1rem' }}>
              Manging users - Strapi
            </Typography>
            <Typography>
              Strapi is the leading open-source headless CMS. It’s 100%
              JavaScript, fully customizable and developer-first.
            </Typography>{' '}
          </Grid>
          <Grid item lg={6} xs={12} order={{ xs: 1, lg: 2 }}>
            <img
              src={strapi}
              alt='strapi-logo'
              style={{ height: matches ? '60px' : '100px' }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ my: '5rem' }}
        >
          <Grid item lg={6} xs={12}>
            <img
              src={cloudinary}
              alt='cloudinary-logo'
              style={{ height: matches ? '200px' : '300px' }}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Typography variant='h4' sx={{ my: '1rem' }}>
              Hosting images - Cloudinary
            </Typography>
            <Typography>
              Cloudinary’s mission is to help companies unleash the full
              potential of their media to create the most engaging visual
              experiences.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
