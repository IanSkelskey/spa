import React from 'react';
import { Box } from '@mui/material';
import ReusableModal from './ReusableModal';

interface ImageViewModalProps {
    open: boolean;
    onClose: () => void;
    imageUrl: string;
    title: string;
}

const ImageViewModal: React.FC<ImageViewModalProps> = ({
    open,
    onClose,
    imageUrl,
    title,
}) => {
    return (
        <ReusableModal open={open} onClose={onClose} title={title}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
                <img
                    src={imageUrl}
                    alt={title}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
            </Box>
        </ReusableModal>
    );
};

export default ImageViewModal;
