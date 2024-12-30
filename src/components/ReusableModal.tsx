import React from 'react';
import { Modal, Box, Typography, IconButton, Tooltip, Zoom, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open} timeout={300}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 0
        }}>
          <Zoom in={open} timeout={300}>
            <Box sx={{
              width: 400,
              maxHeight: '80vh',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 1,
              p: 4
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">{title}</Typography>
                <Tooltip title="Close">
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {children}
            </Box>
          </Zoom>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ReusableModal;