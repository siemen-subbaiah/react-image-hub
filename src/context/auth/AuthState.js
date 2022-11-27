import React from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';
import { reducer, initialState } from './AuthReducer';
import { API_URL } from '../../config';

export const AuthContext = createContext();

const AuthState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //SIGNUP!
  const signup = async (name, email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await fetch(`${API_URL}/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch({
          type: 'ERROR',
          payload: data.message[0].messages[0].message,
        });
        localStorage.setItem('user', null);
      } else {
        dispatch({ type: 'SIGNUP', payload: data });
        localStorage.setItem('user', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  //LOGIN!
  const login = async (email, password) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await fetch(`${API_URL}/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch({
          type: 'ERROR',
          payload: data.message[0].messages[0].message,
        });
        localStorage.setItem('user', null);
      } else {
        dispatch({ type: 'LOGIN', payload: data });
        localStorage.setItem('user', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  //LOGOUT!
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.setItem('user', null);
  };

  return (
    <AuthContext.Provider value={{ ...state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
