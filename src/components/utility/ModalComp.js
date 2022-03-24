import {
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { ModalContext } from '../../context/modal/ModalState';
import { ImageContext } from '../../context/images/ImageState';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import Backdrop from '@mui/material/Backdrop';
import { AuthContext } from '../../context/auth/AuthState';
import { useHistory } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';

const ModalComp = ({ handleDrawerClose }) => {
  const matches = useMediaQuery('(max-width:600px)');

  const { modOpen, handleClose } = useContext(ModalContext);
  const {
    uploadImage,
    imageUpload,
    uploadPost,
    upLoading,
    deleteUploadedImage,
  } = useContext(ImageContext);
  const { user } = useContext(AuthContext);

  const [checked, setChecked] = useState(false);

  const history = useHistory();

  const handleUploadingPost = () => {
    if (imageUpload) {
      uploadPost(user?.user?.username, imageUpload, checked);
      handleClose();
      handleDrawerClose();
      history.push('/account');
    } else {
      alert('please add the image!');
    }
  };

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append('files', e.target.files[0]);
    formData.append('ref', 'images');
    formData.append('field', 'image');

    uploadImage(formData);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? 220 : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={modOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modOpen}>
        <Box sx={style} textAlign='center'>
          <Typography
            id='transition-modal-title'
            variant='h6'
            component='h2'
            sx={{ my: '0.5rem' }}
          >
            Upload Photo
          </Typography>
          <form>
            <>
              <div className='d-flex justify-content-center'>
                {imageUpload ? (
                  <DeleteIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => deleteUploadedImage(imageUpload[0]?.id)}
                  />
                ) : (
                  <>
                    <label
                      htmlFor='contained-button-file'
                      className='upload-file'
                    >
                      <span
                        className='MuiButtonBase-root MuiFab-root upload-file__icon'
                        tabIndex='0'
                        role='button'
                        aria-disabled='false'
                      >
                        <span className='MuiFab-label'>
                          <AddPhotoAlternateIcon
                            className='file-upload'
                            fontSize='large'
                          />
                        </span>
                        <span className='MuiTouchRipple-root'></span>
                      </span>
                    </label>
                    <input
                      id='contained-button-file'
                      name='contained-button-file'
                      type='file'
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    ></input>
                  </>
                )}
              </div>

              {upLoading ? (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      my: '0.5rem',
                    }}
                  >
                    <CircularProgress />
                  </Box>
                </>
              ) : (
                <>
                  {imageUpload !== null && (
                    <Box>
                      <img
                        src={imageUpload[0]?.url}
                        alt='upload-img'
                        style={{ height: '200px' }}
                      />
                    </Box>
                  )}
                </>
              )}
            </>
            <>
              <Box sx={{ width: matches ? '50%' : '25%', m: 'auto' }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label='Public'
                  ></FormControlLabel>
                </FormGroup>
              </Box>
              <Button
                variant='contained'
                color='primary'
                sx={{ my: '0.5rem' }}
                fullWidth
                onClick={handleUploadingPost}
              >
                Upload
              </Button>
            </>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComp;
