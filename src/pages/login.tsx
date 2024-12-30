import { useState } from 'react';
import { AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
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

interface AuthResponse {
    user?: any;
    error?: string;
}

const providers = [{ id: 'credentials', name: 'Email and Password' }];

const LoginPage = ({
    login,
}: {
    login: (email: string, password: string) => void | Promise<AuthResponse>;
}) => {
    const [rememberMe, setRememberMe] = useState(
        localStorage.getItem('rememberedEmail') !== null ? true : false
    );
    const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
        useState(false);
    const [showPassword, setShowPassword] = useState(false);

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const signIn = async (
        _provider: AuthProvider,
        formData?: any,
        _callbackUrl?: string
    ) => {
        try {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const userCredential = await login(email, password);
            if (userCredential && 'user' in userCredential) {
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                return { user: userCredential.user };
            }
            return { error: 'Login failed' };
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message.includes('auth/invalid-credential')) {
                    return { error: 'Invalid email or password' };
                }
                return { error: 'An unknown error occurred: ' + error.message };
            }
            return { error: 'An unknown error occurred' };
        }
    };

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

export default LoginPage;
