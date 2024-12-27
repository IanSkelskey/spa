import Typography from "@mui/material/Typography";
import { PageContainer } from "@toolpad/core";

export default function DashboardPage() {
  return (
    <PageContainer title="Dashboard" maxWidth={false}>
      <Typography variant="body1">
        This is your main hub to monitor activities and access key features.
      </Typography>
    </PageContainer>
  );
}
