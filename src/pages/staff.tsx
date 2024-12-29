import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Button, Box, Tooltip } from "@mui/material";
import LoadingFallback from "../components/LoadingFallback";
import User from "../models/User";
import { PageContainer } from "@toolpad/core";
import NewStaffModal from "../components/NewStaffModal";
import { Add } from "@mui/icons-material";

export default function StaffPage() {
	const [staffUsers, setStaffUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		async function fetchStaffUsers() {
			fetch(`https://us-central1-the-spa-84a52.cloudfunctions.net/getUsersByRole?role=staff`)
				.then((response) => response.json())
				.then((users) => {
					setStaffUsers(users);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Error fetching staff users:", error);
					setLoading(false);
				});
		}
		fetchStaffUsers();
	}, []);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	if (loading) {
		return <LoadingFallback />;
	}

	return (
		<PageContainer title="Staff Members" maxWidth={false}>
			<StaffList staffUsers={staffUsers} handleOpenModal={handleOpenModal} />
			<NewStaffModal open={isModalOpen} onClose={handleCloseModal} />
		</PageContainer>
	);
}

interface StaffListProps {
	staffUsers: User[];
	handleOpenModal: () => void;
}

function StaffList({ staffUsers, handleOpenModal }: StaffListProps) {
	return (
		<>
			{staffUsers.length > 0 ? (
				<><List key={'staff-list'}>
					{staffUsers.map((user, index) => (
						<ListItem key={`${user.email}-${index}`}>
							<ListItemText
								primary={`${user.firstName} ${user.lastName}`}
								secondary={user.email} />
						</ListItem>
					))}
				</List><Box position="fixed" bottom={16} right={16}>
						<Tooltip title="Create new staff">
							<Button
								variant="contained"
								color="primary"
								onClick={handleOpenModal}
								sx={{ borderRadius: '50%', minWidth: 56, minHeight: 56 }}
							>
								<Add />
							</Button>
						</Tooltip>
					</Box></>
			) : (
				<><Typography variant="body1">No staff members available.</Typography><Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mt: 2 }}>
					Create New Staff Member
				</Button></>
			)}
		</>
	);
}
