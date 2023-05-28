"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import PageContainer from '@/components/container/PageContainer'
import DashboardCard from '@/components/shared/DashboardCard'
import { FullLayout } from '@/components/fullLayout/FullLayout';
import { getInventory } from "../../../../../sharedApi/strapi/getInventory";
import Stack from "@mui/material/Stack";
import SuiteCard from "./components/SuiteCard";
import { Button, Typography, Grid } from "@mui/material";
import NewSuiteModal from "./components/NewSuiteModal";


export default function Project() {
  const [newSuite, setNewSuite] = useState<boolean>(false);
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => getInventory(),
  });

  const newSuiteHandler = () => {
    setNewSuite((prev) => !prev);
  };

  return (
    <FullLayout>
      <NewSuiteModal open={newSuite} selectedValue="" onClose={() => newSuiteHandler()}/>
    <PageContainer title="Projects" description="projects">
      <Grid container spacing={2}>
      <Grid item xs={9}>
      <Typography gutterBottom variant="h2" component="div">
                  Inventory
      </Typography>
      </Grid>
      <Grid item xs={2}>
      <Button variant="contained" onClick={newSuiteHandler}>Add Inventory</Button>
      </Grid>
      </Grid>
     {/* <DashboardCard title="Inventory"> */}

      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {new Array(20).fill(0).map((_, i) => <SuiteCard key={i} />)}
      </Stack>
     {/* </DashboardCard> */}
   </PageContainer>
   </FullLayout> 
  );
}
