import React, { createContext, useContext, useReducer } from 'react';
import { AuthContext } from '../auth/AuthState';
import { initialState, reducer } from './ImageReducer';

export const ImageContext = createContext();

const ImageState = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const getImages = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await fetch(
        `https://quiet-springs-07494.herokuapp.com/images?username=${user?.user?.username}&_sort=published_at:desc`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      const data = await res.json();
      dispatch({ type: 'GET_IMAGES', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const getSingleImages = async (id) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await fetch(
        `https://quiet-springs-07494.herokuapp.com/images/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      const data = await res.json();
      dispatch({ type: 'GET_IMAGE_DETAILS', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const getPublicImages = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await fetch(
        `https://quiet-springs-07494.herokuapp.com/images?isPublic=true&_sort=published_at:desc`,
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      const data = await res.json();
      dispatch({ type: 'GET_PUBLIC_IMAGES', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const uploadImage = async (formData) => {
    dispatch({ type: 'UPLOAD_LOADING' });
    try {
      const res = await fetch(
        'https://quiet-springs-07494.herokuapp.com/upload',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      dispatch({ type: 'UPLOAD_IMAGE', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const uploadPost = async (username, image, isPublic) => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await fetch(
        'https://quiet-springs-07494.herokuapp.com/images',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, image, isPublic }),
        }
      );
      const data = await res.json();
      dispatch({ type: 'UPLOAD_POST', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error });
    }
  };

  const deleteImage = async (id) => {
    try {
      await fetch(`https://quiet-springs-07494.herokuapp.com/images/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'DELETE_IMAGE', payload: id });
    } catch (err) {
      console.log(err);
    }
  };

  const setCurrent = (status) => {
    dispatch({ type: 'SET_CURRENT', payload: status });
  };

  const editImage = async (id, isPublic) => {
    try {
      const res = await fetch(
        `https://quiet-springs-07494.herokuapp.com/images/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isPublic: isPublic }),
        }
      );
      const data = await res.json();
      dispatch({ type: 'EDIT_IMAGE', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        ...state,
        getImages,
        getSingleImages,
        getPublicImages,
        uploadImage,
        uploadPost,
        deleteImage,
        setCurrent,
        editImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageState;
