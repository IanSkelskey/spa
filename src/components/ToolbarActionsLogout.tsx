import { Button } from '@mui/material';

function ToolbarActionsLogout({ logout }: { logout: () => void }) {
    return (
        <Button variant="contained" color="primary" onClick={() => logout()}>
            Logout
        </Button>
    );
}

export default ToolbarActionsLogout;
