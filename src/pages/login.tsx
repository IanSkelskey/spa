import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import LoginPageMobile from '../components/pages/LoginPageMobile';
import LoginPageDesktop from '../components/pages/LoginPageDesktop';
import { useAuth } from '../utils/useAuth';

const LoginPage = () => {
    const { login } = useAuth();
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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    if (isMobile) {
        return (
            <LoginPageMobile
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                rememberMe={rememberMe}
                setRememberMe={setRememberMe}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
                error={error}
                setError={setError}
                handleSubmit={handleSubmit}
            />
        );
    }

    return (
        <LoginPageDesktop
            signIn={async (provider, formData) => {
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                return login(email, password);
            }}
            providers={[{ id: 'credentials', name: 'Email and Password' }]}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
        />
    );
};

export default LoginPage;
