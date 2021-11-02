import {
  AppBar,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/auth/AuthState';
import { ModalContext } from '../../context/modal/ModalState';
import ModalComp from './ModalComp';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const { handleOpen, modOpen } = useContext(ModalContext);

  const matches = useMediaQuery('(max-width:600px)');

  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 240;

  return (
    <>
      {matches ? (
        <>
          <AppBar open={open}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap component='div'>
                <Link to='/'>
                  <img src={logo} alt='logo' className='logo' />
                </Link>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            anchor='left'
            open={open}
            onClose={handleDrawerClose}
          >
            <List>
              {user && (
                <>
                  <ListItem onClick={handleDrawerClose}>
                    <Link to='/' className='my-link2'>
                      <Button color='inherit'>Home</Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Button
                      color='inherit'
                      startIcon={<ControlPointIcon />}
                      onClick={handleOpen}
                    >
                      Upload
                    </Button>
                  </ListItem>
                  <ListItem onClick={handleDrawerClose}>
                    <Link to='/account' className='my-link2'>
                      <Button color='inherit'>Account</Button>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Button
                      color='inherit'
                      onClick={() => {
                        logout();
                        history.push('/');
                        handleDrawerClose();
                      }}
                    >
                      LOGOUT
                    </Button>
                  </ListItem>
                </>
              )}
              <ListItem onClick={handleDrawerClose}>
                <Link to='/about' className='my-link2'>
                  <Button color='inherit'>About</Button>
                </Link>
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : (
        <AppBar position='static' color='primary' elevation={0}>
          <Container>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                <Link to='/'>
                  <img src={logo} alt='logo' className='logo' />
                </Link>
              </Typography>
              {user && (
                <>
                  <Link to='/' className='my-link'>
                    <Button color='inherit' sx={{ color: '#fff' }}>
                      Home
                    </Button>
                  </Link>

                  <Button
                    color='inherit'
                    sx={{ color: '#fff', mr: '1.5rem' }}
                    startIcon={<ControlPointIcon />}
                    onClick={handleOpen}
                  >
                    Upload
                  </Button>

                  <Link to='/account' className='my-link'>
                    <Button color='inherit' sx={{ color: '#fff' }}>
                      Account
                    </Button>
                  </Link>
                  <Button
                    color='inherit'
                    sx={{ color: '#fff', mr: '1.5rem' }}
                    onClick={() => {
                      logout();
                      history.push('/');
                    }}
                  >
                    LOGOUT
                  </Button>
                </>
              )}
              <Link to='/about' className='my-link'>
                <Button color='inherit'>About</Button>
              </Link>
            </Toolbar>
          </Container>
        </AppBar>
      )}
      {modOpen && <ModalComp handleDrawerClose={handleDrawerClose} />}
    </>
  );
};

export default NavBar;
