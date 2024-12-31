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

    if (isMobile) {
        return <LoginPageMobile login={login} />;
    }

    return (
        <LoginPageDesktop
            signIn={async (_provider, formData) => {
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
