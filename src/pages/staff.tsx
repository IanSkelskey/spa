import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";
import LoadingFallback from "../components/LoadingFallback";
import User from "../models/User";
import { getUsersByRole } from "../utils/firestore";
import { PageContainer } from "@toolpad/core";
import NewStaffModal from "../components/NewStaffModal";

export default function StaffPage() {
	const [staffUsers, setStaffUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		async function fetchStaffUsers() {
			const users = await getUsersByRole("staff");
			setStaffUsers(users);
			setLoading(false);
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
			{staffUsers.length > 0 ? (
				<List>
					{staffUsers.map((user) => (
						<ListItem key={user.email}>
							<ListItemText
								primary={`${user.firstName} ${user.lastName}`}
								secondary={user.email}
							/>
						</ListItem>
					))}
				</List>
			) : (
				<Box textAlign="center" mt={4}>
					<Typography variant="body1">No staff members available.</Typography>
					<Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mt: 2 }}>
						Create New Staff Member
					</Button>
				</Box>
			)}
			<NewStaffModal open={isModalOpen} onClose={handleCloseModal} />
		</PageContainer>
	);
}