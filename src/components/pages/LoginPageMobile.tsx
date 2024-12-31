import React, { useState } from 'react';
import {
    Typography,
    IconButton,
    InputAdornment,
    Tooltip,
    FormControlLabel,
    Checkbox,
    Box,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';

interface LoginPageMobileProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    rememberMe: boolean;
    setRememberMe: (value: boolean) => void;
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
    loading: boolean;
    error: string | null;
    setError: (value: string | null) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const LoginPageMobile: React.FC<LoginPageMobileProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    loading,
    error,
    setError,
    handleSubmit,
}) => {
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
        useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    function RememberMe() {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        checked={rememberMe}
                        onChange={(event) =>
                            setRememberMe(event.target.checked)
                        }
                        color="primary"
                        sx={{
                            padding: 0.5,
                            '& .MuiSvgIcon-root': { fontSize: 20 },
                        }}
                    />
                }
                slotProps={{
                    typography: {
                        variant: 'body2',
                        color: 'textSecondary',
                    },
                }}
                color="textSecondary"
                label="Remember Me"
            />
        );
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    padding: 2,
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    fontWeight="bold"
                    align="center"
                >
                    Sign In to the Spa Dashboard
                </Typography>
                <Typography
                    variant="body2"
                    gutterBottom
                    color="textSecondary"
                    align="center"
                >
                    Welcome, please sign in to continue
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {error && (
                        <Typography color="error" gutterBottom>
                            {error}
                        </Typography>
                    )}
                    <TextField
                        label="Email"
                        required
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        required
                        fullWidth
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <RememberMe />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Link
                            onClick={() => setForgotPasswordModalOpen(true)}
                            to={''}
                        >
                            <Typography variant="body2">
                                Forgot Password?
                            </Typography>
                        </Link>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
            <ForgotPasswordModal
                open={isForgotPasswordModalOpen}
                onClose={() => setForgotPasswordModalOpen(false)}
            />
        </>
    );
};

export default LoginPageMobile;
