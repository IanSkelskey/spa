import React, { useState, useCallback } from 'react';
import {
    Button,
    Box,
    Typography,
    CircularProgress,
    Slider,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from 'react-easy-crop';
import ReusableModal from './ReusableModal';
import getCroppedImg from '../../utils/cropImage';

interface UploadProfileImageModalProps {
    open: boolean;
    onClose: () => void;
    onUpload: (file: File) => Promise<void>;
}

const UploadProfileImageModal: React.FC<UploadProfileImageModalProps> = ({
    open,
    onClose,
    onUpload,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUpload = async () => {
        if (selectedFile && croppedAreaPixels) {
            setLoading(true);
            const croppedImage = await getCroppedImg(
                preview,
                croppedAreaPixels
            );
            const croppedFile = new File([croppedImage], selectedFile.name, {
                type: selectedFile.type,
            });
            await onUpload(croppedFile);
            setLoading(false);
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setPreview(null);
        setLoading(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        onClose();
    };

    return (
        <ReusableModal
            open={open}
            onClose={handleClose}
            title="Upload Profile Picture"
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="upload-profile-image-input"
                />
                <label htmlFor="upload-profile-image-input">
                    <Button variant="contained" component="span">
                        Select Image
                    </Button>
                </label>
                <Box mt={2} width="100%" height={400} position="relative">
                    <Cropper
                        image={preview}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </Box>
                {preview && (
                    <Box mt={2} width="100%">
                        <Typography variant="body2">Zoom:</Typography>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e, zoom) => setZoom(zoom as number)}
                        />
                    </Box>
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
        </ReusableModal>
    );
};

export default UploadProfileImageModal;
