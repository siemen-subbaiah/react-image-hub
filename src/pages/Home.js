import { Avatar, Card, CardHeader, CardMedia, Container } from '@mui/material';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ImageContext } from '../context/images/ImageState';
import Spinner from '../components/utility/Spinner';

const Home = () => {
  const { getPublicImages, publicImages, loading } = useContext(ImageContext);

  useEffect(() => {
    getPublicImages();
    //eslint-disable-next-line
  }, []);

  return (
    <Container sx={{ mt: '5rem' }}>
      {publicImages.length === 0 && <Spinner />}
      {publicImages.map((item) => {
        return (
          <Card
            key={item.id}
            sx={{
              maxWidth: 500,
              m: '1.5rem auto',
              boxShadow:
                '0 6px 6px rgba(10,16,20,.15), 0 0 52px rgba(10,16,20,.12)',
              border: '1px solid #d3d3d3',
            }}
          >
            <CardHeader
              avatar={
                loading ? (
                  <Skeleton
                    animation='wave'
                    variant='circular'
                    width={40}
                    height={40}
                  />
                ) : (
                  <Avatar
                    sx={{ backgroundColor: '#29AEFA' }}
                    aria-label='recipe'
                  >
                    {item?.username[0].toUpperCase()}
                  </Avatar>
                )
              }
              title={item.username}
            />
            {loading ? (
              <Skeleton
                sx={{ height: 350 }}
                animation='wave'
                variant='rectangular'
              />
            ) : (
              <CardMedia
                component='img'
                // height='194'
                image={item?.image?.url}
                alt={item?.username}
                sx={{ width: '100%' }}
              />
            )}
          </Card>
        );
      })}
    </Container>
  );
};

export default Home;
