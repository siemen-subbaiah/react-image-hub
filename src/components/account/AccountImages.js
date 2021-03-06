import { Grid, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { ImageContext } from '../../context/images/ImageState';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

const AccountImages = () => {
  const { images, getImages, loading } = useContext(ImageContext);

  useEffect(() => {
    getImages();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {images.length === 0 && (
        <Typography sx={{ textAlign: 'center' }}>No Uploads Yet</Typography>
      )}
      <Grid container sx={{ my: '2rem' }} columnSpacing={3}>
        {images?.map((item, i) => (
          <Grid item xs={12} lg={4} md={6} key={i}>
            {loading ? (
              <Skeleton
                sx={{ height: 350 }}
                animation='wave'
                variant='rectangular'
              />
            ) : (
              <div
                style={{
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '1rem 0',
                  boxShadow: '10px 10px 30px rgba(0,0,0,0.1)',
                }}
              >
                <Link to={`/image/${item.id}`}>
                  <img
                    src={item.image.url}
                    alt={item.username}
                    loading='lazy'
                    style={{
                      height: '350px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Link>
              </div>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default AccountImages;
