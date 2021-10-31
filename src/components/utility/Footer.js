import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <footer className='my-footer'>
      <Box sx={{ bgcolor: '#29AEFA', p: '1rem' }} textAlign='center'>
        <Container>
          <Box>
            <a href='https://github.com/siemen-subbaiah'>
              <GitHubIcon className='f-icon' />
            </a>
            <a href='https://www.linkedin.com/in/siemen-subbaiah'>
              <LinkedInIcon className='f-icon' />
            </a>
            <a href='mailto:siemensubbaiah1@gmail.com'>
              <EmailIcon className='f-icon' />
            </a>
          </Box>
          <Typography sx={{ color: '#fff' }}>
            {new Date().getFullYear()} Made by siemen subbaiah
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
