import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { PageContainer } from "@toolpad/core";
import { Box } from "@mui/material";
import User from "../models/User";

const ProfilePage = () => {
  const user: User = {
    firstName: "John",
    lastName: "Doe",
    email: "email@example.org",
    role: "client",
  };

  return (
    <PageContainer title="Profile" maxWidth={false}>
      <Typography variant="h5" gutterBottom>
        {user.firstName} {user.lastName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.email}
      </Typography>
      <Box position="fixed" bottom={16} right={16}>
        <Tooltip title="Edit Profile">
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "50%", minWidth: 56, minHeight: 56 }}
          >
            <EditIcon />
          </Button>
        </Tooltip>
      </Box>
    </PageContainer>
  );
};

export default ProfilePage;
