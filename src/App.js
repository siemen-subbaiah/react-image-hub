import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/utility/NavBar';
import About from './pages/About';
import Account from './pages/Account';
import Home from './pages/Home';
import Landing from './pages/Landing';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthState';
import ImageDetails from './pages/ImageDetails';
import Footer from './components/utility/Footer';

const App = () => {
  const { user } = useContext(AuthContext);
  const theme = createTheme({
    palette: {
      primary: {
        main: '#29AEFA',
      },
    },
    typography: {
      fontFamily: ['Poppins'].join(''),
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route path='/' component={user ? Home : Landing} exact />
          <Route path='/account' component={Account} />
          <Route path='/image/:id' component={ImageDetails} />
          <Route path='/about' component={About} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
