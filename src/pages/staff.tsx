import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText, Button, Box, Tooltip } from "@mui/material";
import LoadingFallback from "../components/LoadingFallback";
import User from "../models/User";
import { getUsersByRole } from "../utils/firestore";
import { PageContainer } from "@toolpad/core";
import NewStaffModal from "../components/NewStaffModal";
import React from "react";
import { Add } from "@mui/icons-material";

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
						<React.Fragment key={user.email}>
							<ListItem>
								<ListItemText
									primary={`${user.firstName} ${user.lastName}`}
									secondary={user.email}
								/>
							</ListItem>
							<Box position="fixed" bottom={16} right={16}>
								<Tooltip title="Create User">
									<Button
										variant="contained"
										color="primary"
										onClick={handleOpenModal}
										style={{ borderRadius: "50%", minWidth: "56px", minHeight: "56px" }}
									>
										<Add />
									</Button>
								</Tooltip>
							</Box>
						</React.Fragment>
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
