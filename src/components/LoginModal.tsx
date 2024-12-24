import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyles}>
        <IconButton onClick={onClose} sx={closeButtonStyles}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2">
          Login
        </Typography>
        <Typography variant="body1" component="p">
          Log in to your account
        </Typography>
        <form>
          <TextField fullWidth margin="normal" type="email" label="Email" variant="outlined" />
          <TextField fullWidth margin="normal" type="password" label="Password" variant="outlined" />
          <Button fullWidth variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

const modalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const closeButtonStyles = {
  position: 'absolute' as 'absolute',
  top: 8,
  right: 8,
};

export default LoginModal;
