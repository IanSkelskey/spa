import { IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function ToolbarActionsLogout({ logout }: { logout: () => void }) {
    return (
        <Tooltip title="Logout">
            <IconButton color="primary" onClick={logout}>
                <LogoutIcon />
            </IconButton>
        </Tooltip>
    );
}

export default ToolbarActionsLogout;
