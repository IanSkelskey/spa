// src/components/modals/UploadImageModal.tsx
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReusableModal from './ReusableModal';

interface UploadImageModalProps {
    open: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<void>;
}

const UploadImageModal: React.FC<UploadImageModalProps> = ({
    open,
    onClose,
    onUpload,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [animate, setAnimate] = useState(false);
    const [fullScreenOpen, setFullScreenOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            setLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setLoading(false);
                setAnimate(true);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
            setAnimate(false);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setLoading(true);
            await onUpload(selectedFile);
            setLoading(false);
            onClose();
        }
    };

    useEffect(() => {
        if (preview) {
            setAnimate(true);
        }
    }, [preview]);

    const handlePreviewClick = () => {
        setFullScreenOpen(true);
    };

    const handleFullScreenClose = () => {
        setFullScreenOpen(false);
    };

    return (
        <ReusableModal open={open} onClose={onClose} title="Upload Image">
            <Box display="flex" flexDirection="column" alignItems="center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="upload-image-input"
                />
                <label htmlFor="upload-image-input">
                    <Button variant="contained" component="span">
                        Select Image
                    </Button>
                </label>
                {loading ? (
                    <Box mt={2}>
                        <CircularProgress />
                    </Box>
                ) : (
                    preview && (
                        <Box
                            mt={2}
                            style={{
                                transition: 'all 0.3s ease-in-out',
                                opacity: animate ? 1 : 0,
                                transform: animate ? 'scale(1)' : 'scale(0.8)',
                            }}
                            onClick={handlePreviewClick}
                        >
                            <Typography variant="body2">Preview:</Typography>
                            <img
                                src={preview || ''}
                                alt="Preview"
                                style={{ maxWidth: '100%', maxHeight: 200, cursor: 'pointer' }}
                            />
                        </Box>
                    )
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                    sx={{ mt: 2 }}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </Button>
            </Box>
            <Modal open={fullScreenOpen} onClose={handleFullScreenClose}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    bgcolor="rgba(0, 0, 0, 0.8)"
                    position="relative"
                    p={2}
                >
                    <IconButton
                        onClick={handleFullScreenClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        component="img"
                        src={preview || ''}
                        alt="Full Screen Preview"
                        sx={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            transition: 'all 0.3s ease-in-out',
                            opacity: fullScreenOpen ? 1 : 0,
                            transform: fullScreenOpen ? 'scale(1)' : 'scale(0.8)',
                        }}
                    />
                </Box>
            </Modal>
        </ReusableModal>
    );
};

export default UploadImageModal;