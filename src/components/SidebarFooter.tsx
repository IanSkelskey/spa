import { Typography } from '@mui/material';
import { SidebarFooterProps } from '@toolpad/core';

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{
                m: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: 'text.secondary',
            }}
        >
            {mini
                ? '© 2024'
                : `© ${new Date().getFullYear()} Made with ❤️ by Ian Skelskey`}
        </Typography>
    );
}

export default SidebarFooter;
