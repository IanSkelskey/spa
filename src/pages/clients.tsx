import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ClientsPage() {
  const clients = ["Client A", "Client B", "Client C"];

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Typography variant="body1" gutterBottom>
        Below is a list of clients managed through this system:
      </Typography>
      <List>
        {clients.map((client, index) => (
          <ListItem key={index}>
            <ListItemText primary={client} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
