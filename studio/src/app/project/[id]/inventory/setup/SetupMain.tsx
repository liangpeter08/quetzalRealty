"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import PageContainer from '@/components/container/PageContainer'
import DashboardCard from '@/components/shared/DashboardCard'
import { FullLayout } from '@/components/fullLayout/FullLayout';
import { getInventory } from "../../../../../sharedApi/strapi/getInventory";
import Stack from "@mui/material/Stack";
import SuiteCard from "./components/ModelCard";
import { Button, Typography, Grid, Box, Paper } from "@mui/material";
import NewModelModal from "./components/newModelModal/NewModelModal";
import { ApiModelModel } from "@/utils/schemas";


export default function Project() {
  const [newSuite, setNewSuite] = useState<boolean>(false);
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => getInventory(),
  });

  const newSuiteHandler = () => {
    setNewSuite((prev) => !prev);
  };

  return (
    <FullLayout>
      <NewModelModal open={newSuite} selectedValue="" onClose={() => newSuiteHandler()} refetch={refetch} />
      <PageContainer title="Projects" description="projects">
        <Grid container spacing={2} justifyContent='center' alignContent='center'>
          <Grid item xs={10}>
            <Typography gutterBottom variant="h2" component="div">
              Inventory
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={newSuiteHandler}>Add Product</Button>
          </Grid>
        </Grid>
        {/* <DashboardCard title="Inventory"> */}
        <Paper elevation={12}>
          <Box sx={{ m: 4, p: 4 }}>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
              {(data?.data || []).map((model: ApiModelModel, i: number) => <SuiteCard key={i} model={model} />)}
            </Stack>
          </Box>
        </Paper>
        {/* </DashboardCard> */}
      </PageContainer>
    </FullLayout>
  );
}
