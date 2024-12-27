import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { PageContainer } from "@toolpad/core";

export default function ClientsPage() {
	const clients = ["Client A", "Client B", "Client C"];

	return (
		<PageContainer title="Clients" maxWidth={false}>
			<List key={"clients-list"}>
				{clients.map((client, index) => (
					<ListItem key={`${client}-${index}`}>
						<ListItemText primary={client} />
					</ListItem>
				))}
			</List>
		</PageContainer>
	);
}
