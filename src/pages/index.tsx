import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function DashboardPage() {
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
        Welcome to the Dashboard!
      </Typography>
      <Typography variant="body1">
        This is your main hub to monitor activities and access key features.
      </Typography>
    </Box>
  );
}
