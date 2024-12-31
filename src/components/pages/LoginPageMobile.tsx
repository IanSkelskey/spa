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
import logo from '../../assets/logo.svg';

interface LoginPageMobileProps {
    login: (
        email: string,
        password: string
    ) => Promise<{ user?: any; error?: string }>;
}

const LoginPageMobile: React.FC<LoginPageMobileProps> = ({ login }) => {
    const [rememberMe, setRememberMe] = useState(
        localStorage.getItem('rememberedEmail') !== null
    );
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(
        localStorage.getItem('rememberedEmail') || ''
    );
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
        useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await login(email, password);
            if (result.error) {
                setError(result.error);
            } else if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
        } catch (error) {
            setError('An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

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
                    width: '100vw',
                    overflow: 'hidden',
                    padding: 2,
                }}
            >
                <img
                    src={logo}
                    alt="App Logo"
                    width={32}
                    height={32}
                    style={{ margin: 8, borderRadius: '50%' }}
                />
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
