import {
  Alert,
  Button,
  Card,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { ImageContext } from '../context/images/ImageState';
import Spinner from '../components/utility/Spinner';
import QRCode from 'qrcode.react';
import { Box } from '@mui/system';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const ImageDetails = () => {
  const matches = useMediaQuery('(max-width:600px)');

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: matches ? 260 : 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
  };

  const parms = useParams();
  const history = useHistory();

  const {
    imageDetails,
    getSingleImages,
    loading,
    deleteImage,
    setCurrent,
    status,
    editImage,
  } = useContext(ImageContext);

  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openMainDialog, setOpenMainDialog] = React.useState(false);

  useEffect(() => {
    getSingleImages(parms.id);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  const handleDelete = () => {
    deleteImage(imageDetails.id);
    history.push('/account');
  };

  const handleEdit = () => {
    editImage(imageDetails.id, checked);
    history.push('/account');
  };

  // MAIN DIALOG!
  const handleMainClickOpen = () => {
    setOpenMainDialog(true);
  };

  const handleMainClickClose = () => {
    setOpenMainDialog(false);
  };

  // DELETE DIALOG!
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClickClose = () => {
    setOpenDialog(false);
  };

  // EDIT DIALOG!
  const handleEditClickOpen = () => {
    setOpenEditDialog(true);
  };

  const handleEditClickClose = () => {
    setOpenEditDialog(false);
  };

  // COPY FUNCTIONS!
  const handleCopy = () => {
    navigator.clipboard.writeText(imageDetails?.image?.url);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container sx={{ my: '5rem' }}>
      {loading ? (
        <Spinner />
      ) : (
        <Card
          sx={{
            p: '1rem',
            boxShadow:
              '0 6px 6px rgba(10,16,20,.15), 0 0 52px rgba(10,16,20,.12)',
            border: '1px solid #d3d3d3',
          }}
        >
          <CardHeader
            action={
              <IconButton
                onClick={() => {
                  handleMainClickOpen();
                  setCurrent(imageDetails.isPublic);
                }}
              >
                <MoreHorizIcon />
              </IconButton>
            }
          />
          <Grid
            spacing={5}
            container
            justifyContent='center'
            alignItems='center'
          >
            <Grid item lg={6} xs={12}>
              <img
                src={imageDetails?.image?.url}
                alt={imageDetails.username}
                style={{
                  maxWidth: '100%',
                }}
              />
              <Typography sx={{ mt: '1rem' }}>
                Scan the QR code or click the button to get the Link
              </Typography>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Box sx={{ mb: '1rem' }}>
                <QRCode
                  value={`${imageDetails?.image?.url}`}
                  renderAs='svg'
                  size={250}
                />
              </Box>
              <Button variant='contained' color='primary' onClick={handleCopy}>
                Copy link
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Link Successfully Copied
        </Alert>
      </Snackbar>

      {/* EDIT DAILOG! */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClickClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Edit the status'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Edit the visibility of the post by enabling/disabling.
          </DialogContentText>
          <Box sx={{ mt: '0.5rem' }}>
            <FormControl component='fieldset' variant='standard'>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                      name='public'
                    />
                  }
                  label={checked ? 'Public' : 'Private'}
                />
              </FormGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClickClose}>Go Back</Button>
          <Button color='success' onClick={handleEdit} autoFocus>
            Change
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE DAILOG! */}
      <Dialog
        open={openDialog}
        onClose={handleClickClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure you to delete this?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Once deleted,you cannot view this post again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' onClick={handleClickClose}>
            Go Back
          </Button>
          <Button color='error' onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* MAIN MODAL! */}
      <Modal
        open={openMainDialog}
        onClose={handleMainClickClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary='Delete' />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleEditClickOpen();
                }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary='Edit' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Modal>
    </Container>
  );
};

export default ImageDetails;
