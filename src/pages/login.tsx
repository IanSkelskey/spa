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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleLogin = async (email: string, password: string) => {
        const result = await login(email, password);
        if (result.user && rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        return result;
    };

    if (isMobile) {
        return <LoginPageMobile login={handleLogin} />;
    }

    return (
        <LoginPageDesktop
            signIn={async (_provider, formData) => {
                const email = formData.get('email') as string;
                const password = formData.get('password') as string;
                return handleLogin(email, password);
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
