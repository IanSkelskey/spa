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
	IconButton,
	Box,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface UserTableProps {
	users: User[];
	createAction: () => void;
	deleteAction: (email: string) => void;
	role?: string;
}

const UserTable: React.FC<UserTableProps> = ({
	users,
	createAction,
	deleteAction,
	role,
}) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [checked, setChecked] = useState<number[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

	const handleDeleteClick = (user: User) => {
		setSelectedUsers([user]);
		setIsDeleteModalOpen(true);
	};

	const handleBatchDeleteClick = () => {
		const selected = users.filter((user, index) => checked.includes(index));
		setSelectedUsers(selected);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		for (const user of selectedUsers) {
			await deleteAction(user.email);
		}
		setIsDeleteModalOpen(false);
		setChecked([]);
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
		{
			field: 'actions',
			headerName: 'Actions',
			width: 150,
			renderCell: (params) => (
				<IconButton
					color="error"
					onClick={() => handleDeleteClick(params.row as User)}
				>
					<Delete />
				</IconButton>
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
									<IconButton
										color="error"
										onClick={() =>
											handleDeleteClick(user)
										}
									>
										<Delete />
									</IconButton>
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
					<Tooltip title="Delete selected users">
					<span>
						<Fab
							color="error"
							aria-label="delete"
							onClick={handleBatchDeleteClick}
							sx={{ position: 'fixed', bottom: 16, right: 80 }}
							disabled={checked.length === 0}
						>
							<Delete />
						</Fab>
					</span>
					</Tooltip>
				</>
			) : (
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
			)}
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

export default UserTable;