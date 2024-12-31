import React, { useState } from 'react';
import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import { Link } from 'react-router-dom';
import {
    Typography,
    IconButton,
    InputAdornment,
    Tooltip,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';

interface LoginPageDesktopProps {
    signIn: (
        provider: AuthProvider,
        formData?: any,
        callbackUrl?: string
    ) => Promise<{ user?: any; error?: string }>;
    providers: { id: string; name: string }[];
    rememberMe: boolean;
    setRememberMe: (value: boolean) => void;
    showPassword: boolean;
    setShowPassword: (value: boolean) => void;
}

const LoginPageDesktop: React.FC<LoginPageDesktopProps> = ({
    signIn,
    providers,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
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
            <SignInPage
                signIn={signIn}
                providers={providers}
                slots={{
                    forgotPasswordLink: () => (
                        <Link
                            onClick={() => setForgotPasswordModalOpen(true)}
                            to={''}
                        >
                            <Typography variant="body2">
                                Forgot Password?
                            </Typography>
                        </Link>
                    ),
                    rememberMe: RememberMe,
                }}
                slotProps={{
                    emailField: {
                        label: 'Email',
                        required: true,
                        defaultValue:
                            localStorage.getItem('rememberedEmail') || '',
                    },
                    passwordField: {
                        label: 'Password',
                        required: true,
                        type: showPassword ? 'text' : 'password',
                        InputProps: {
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
                        },
                    },
                }}
            />
            <ForgotPasswordModal
                open={isForgotPasswordModalOpen}
                onClose={() => setForgotPasswordModalOpen(false)}
            />
        </>
    );
};

export default LoginPageDesktop;
