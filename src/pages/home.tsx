import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Root Dashboard!
      </Typography>
      <Typography variant="body1">
        Select an option from the navigation menu to get started.
      </Typography>
    </Box>
  );
}
