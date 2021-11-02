import {
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { ModalContext } from '../../context/modal/ModalState';
import { ImageContext } from '../../context/images/ImageState';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Backdrop from '@mui/material/Backdrop';
import { AuthContext } from '../../context/auth/AuthState';
import { useHistory } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';

const ModalComp = ({ handleDrawerClose }) => {
  const matches = useMediaQuery('(max-width:600px)');

  const { modOpen, handleClose } = useContext(ModalContext);
  const { uploadImage, imageUpload, uploadPost, upLoading } =
    useContext(ImageContext);
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const [checked, setChecked] = React.useState(false);

  const history = useHistory();

  const formData = new FormData();
  formData.append('files', image);
  formData.append('ref', 'images');
  formData.append('field', 'image');

  const handleUpload = (e) => {
    e.preventDefault();
    if (image) {
      uploadImage(formData);
    } else {
      alert('please add the image!');
    }
  };

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
    setImage(e.target.files[0]);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
          <Typography id='transition-modal-title' variant='h6' component='h2'>
            Upload Photo
          </Typography>
          <form>
            {activeStep === 0 ? (
              <>
                <div className='d-flex justify-content-center'>
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
                        <AddPhotoAlternateIcon className='file-upload' />
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
                  <Typography fontSize='0.7rem'>{image?.name}</Typography>
                </div>

                {upLoading ? (
                  <Typography>loading...</Typography>
                ) : (
                  <>
                    {imageUpload !== null && (
                      <Box>
                        <img
                          src={imageUpload[0].url}
                          alt='upload-img'
                          style={{ height: '200px' }}
                        />
                      </Box>
                    )}
                  </>
                )}
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  sx={{ my: '0.5rem' }}
                  disabled={imageUpload}
                  onClick={handleUpload}
                >
                  Add image
                </Button>
              </>
            ) : (
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
            )}
          </form>
          <MobileStepper
            variant='dots'
            steps={2}
            position='static'
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1 }}
            nextButton={
              <Button
                size='small'
                onClick={handleNext}
                disabled={activeStep === 5}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size='small'
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalComp;
