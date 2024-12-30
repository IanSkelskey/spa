import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import User from '../models/User';
import {
    Button,
    Tooltip,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme,
    Checkbox,
    ListItemIcon,
    Fab,
} from '@mui/material';
import { Add } from '@mui/icons-material';

interface UserTableProps {
    users: User[];
    createAction: () => void;
    role?: string;
}

const UserTable: React.FC<UserTableProps> = ({ users, createAction, role }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [checked, setChecked] = useState<number[]>([]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        {
            field: 'email',
            headerName: 'Email',
            width: 200,
            renderCell: (params) => (
                <a
                    href={`mailto:${params.value}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {params.value}
                </a>
            ),
        },
        { field: 'role', headerName: 'Role', width: 150 },
    ];

    const rows = users.map((user, index) => ({ ...user, id: index }));

    const CustomToolbar: React.FC = () => {
        return (
            <GridToolbarContainer style={{ padding: '4px 16px' }}>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Tooltip title={`Create new ${role || 'user'}`}>
                    <Button
                        color="primary"
                        startIcon={<Add />}
                        onClick={createAction}
                    >
                        New {role || 'user'}
                    </Button>
                </Tooltip>
            </GridToolbarContainer>
        );
    };

    return (
        <>
            {isMobile ? (
                <>
                    <List>
                        {users.map((user, index) => {
                            const labelId = `checkbox-list-label-${index}`;

                            return (
                                <ListItem key={index} divider>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.includes(index)}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            onClick={handleToggle(index)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        primary={
                                            <span
                                                style={{ fontWeight: 'bold' }}
                                            >
                                                {user.firstName} {user.lastName}
                                            </span>
                                        }
                                        secondary={
                                            <>
                                                <a
                                                    href={`mailto:${user.email}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'inherit',
                                                    }}
                                                >
                                                    {user.email}
                                                </a>
                                                <span
                                                    style={{
                                                        display: 'block',
                                                        color: 'gray',
                                                    }}
                                                >
                                                    {user.role}
                                                </span>
                                            </>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                    <Tooltip title={`Create new ${role || 'user'}`}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            onClick={createAction}
                            sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        >
                            <Add />
                        </Fab>
                    </Tooltip>
                </>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    pageSizeOptions={[5]}
                    checkboxSelection
                    slots={{
                        toolbar: () => <CustomToolbar />,
                    }}
                />
            )}
        </>
    );
};

export default UserTable;
