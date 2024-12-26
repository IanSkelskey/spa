import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export default function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        textAlign: "center",
      }}
    >
      <Avatar
        sx={{ width: 80, height: 80, marginBottom: 2 }}
        alt={user.name}
        src="/profile-pic-placeholder.png"
      />
      <Typography variant="h5" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.email}
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
}
