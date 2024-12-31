// src/components/DesktopUserTable.tsx
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
import { Button, Tooltip, IconButton } from '@mui/material';
import { Add, Delete, Info } from '@mui/icons-material';
import ConfirmDeleteModal from './modals/ConfirmDeleteModal';
import { Link } from 'react-router-dom';

interface DesktopUserTableProps {
	users: User[];
	createAction: () => void;
	deleteAction: (email: string) => void;
	role?: string;
}

const DesktopUserTable: React.FC<DesktopUserTableProps> = ({
	users,
	createAction,
	deleteAction,
	role,
}) => {
	const [checked, setChecked] = useState<number[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleDeleteClick = (user: User) => {
		setSelectedUsers([user]);
		setIsDeleteModalOpen(true);
	};

	const handleBatchDeleteClick = () => {
		const selected = users.filter((_user, index) =>
			checked.includes(index)
		);
		setSelectedUsers(selected);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		for (const user of selectedUsers) {
			await deleteAction(user.email); // Await the delete action
		}
		setIsDeleteModalOpen(false);
		setChecked([]);
	};

	const columns: GridColDef[] = [
		{ field: 'firstName', headerName: 'First name', width: 150 },
		{ field: 'lastName', headerName: 'Last name', width: 150 },
		{ field: 'email', headerName: 'Email', width: 200 },
		{ field: 'role', headerName: 'Role', width: 150 },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 150,
			renderCell: (params) => (
				<>
					<Link to={`/clients/${params.row.email}`}>
						<Tooltip title="View Details">
							<IconButton color="primary">
								<Info />
							</IconButton>
						</Tooltip>
					</Link>
					<IconButton
						color="error"
						onClick={() => handleDeleteClick(params.row as User)}
					>
						<Delete />
					</IconButton>
				</>
			),
		},
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
				<Tooltip title="Delete selected users">
					<span>
						<Button
							color="error"
							startIcon={<Delete />}
							onClick={handleBatchDeleteClick}
							disabled={checked.length === 0}
						>
							Delete Selected
						</Button>
					</span>
				</Tooltip>
			</GridToolbarContainer>
		);
	};

	return (
		<>
			<DataGrid
				rows={rows}
				columns={columns}
				pagination
				pageSizeOptions={[25, 50, 100]}
				checkboxSelection
				slots={{
					toolbar: () => <CustomToolbar />,
				}}
				onRowSelectionModelChange={(newSelection) => {
					setChecked(newSelection as number[]);
				}}
			/>
			{selectedUsers.length > 0 && (
				<ConfirmDeleteModal
					open={isDeleteModalOpen}
					onClose={() => setIsDeleteModalOpen(false)}
					onConfirm={handleConfirmDelete}
					userName={
						selectedUsers.length === 1
							? `${selectedUsers[0].firstName} ${selectedUsers[0].lastName}`
							: `${selectedUsers.length} users`
					}
				/>
			)}
		</>
	);
};

export default DesktopUserTable;