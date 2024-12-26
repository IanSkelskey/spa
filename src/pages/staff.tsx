import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function StaffPage() {
	const staffMembers = ["Staff A", "Staff B", "Staff C"];

	return (
		<Box
			sx={{
				padding: 3,
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<Typography variant="h4" gutterBottom>
				Staff
			</Typography>
			<Typography variant="body1" gutterBottom>
				Below is a list of staff members working in this organization:
			</Typography>
			<List>
				{staffMembers.map((staff, index) => (
					<ListItem key={index}>
						<ListItemText primary={staff} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}