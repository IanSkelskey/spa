import React from 'react';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import User from '../models/User';
import { Button, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';

interface UserTableProps {
	users: User[];
	createAction: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, createAction }) => {
	const columns: GridColDef[] = [
		{ field: 'firstName', headerName: 'First name', width: 150 },
		{ field: 'lastName', headerName: 'Last name', width: 150 },
		{ field: 'email', headerName: 'Email', width: 200 },
		{ field: 'role', headerName: 'Role', width: 150 },
	];

	const rows = users.map((user, index) => ({ ...user, id: index }));

	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				pagination
				pageSizeOptions={[5]}
				checkboxSelection
				slots={{
					toolbar: () => <CustomToolbar createAction={createAction} />,
				}}
			/>
		</>
	);
};

interface CustomToolbarProps {
	createAction: () => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ createAction }) => {
	return (
		<GridToolbarContainer style={{ padding: '4px 16px' }}>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
			<GridToolbarExport />
			<Tooltip title="Create new staff">
				<Button
					color="primary"
					startIcon={<Add />}
					onClick={createAction}
				>
					New staff
				</Button>
			</Tooltip>
		</GridToolbarContainer>
	);
};

export default UserTable;