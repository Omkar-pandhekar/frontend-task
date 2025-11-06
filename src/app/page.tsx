"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import ImportExportButtons from "@/components/ImportExportButtons";
import ManageColumnsModal from "@/components/ManageColumnsModal";
import DataTable from "@/components/DataTable";

export default function Page() {
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Data Table Manager
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
        <ImportExportButtons />
        <ManageColumnsModal />
      </Stack>

      <Card>
        <CardContent>
          <DataTable />
        </CardContent>
      </Card>
    </Box>
  );
}
