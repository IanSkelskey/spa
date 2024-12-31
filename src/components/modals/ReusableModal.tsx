import React from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Tooltip,
    Zoom,
    Fade,
    useMediaQuery,
    Theme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReusableModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
    open,
    onClose,
    title,
    children,
}) => {
    const isMobile = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );

    return (
        <Modal open={open} onClose={onClose} closeAfterTransition>
            <Fade in={open} timeout={300}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        outline: 0,
                        width: isMobile ? '100%' : 400,
                        height: isMobile ? '100%' : 'auto',
                        maxHeight: isMobile ? '100%' : '80vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: isMobile ? 0 : 1,
                        p: 4,
                    }}
                >
                    <Zoom in={open} timeout={300}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h6">{title}</Typography>
                                <Tooltip title="Close">
                                    <IconButton onClick={onClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                                {children}
                            </Box>
                        </Box>
                    </Zoom>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ReusableModal;
