import ModelCard from "@/app/project/[id]/inventory/setup/components/ModelCard";
import { getInventory, ModelType } from "@/sharedApi/strapi/getInventory";
import { Grid, Typography, Button, Paper, Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import PageContainer from "../container/PageContainer";
import { FullLayout } from "../fullLayout/FullLayout";
import { useInView } from "react-intersection-observer";

const InfiniteScrollComponent = () => {
  const [newSuite, setNewSuite] = useState<boolean>(false);
  const { ref, inView } = useInView();

  const { data, isLoading, isFetching, error, refetch, fetchNextPage } = useInfiniteQuery({
    queryKey: ["inventory"],
    queryFn: ({ pageParam = 1 }) => getInventory({
      pagination: {
        page: pageParam,
        pageSize: 10
      }
    }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage
    }
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <PageContainer title="Projects" description="projects">
      <Paper elevation={12} sx={{ maxHeight: 400, m: 2, overflow: 'auto' }}>
        <Box sx={{ m: 4, p: 4 }}>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            {(data?.pages || []).map((page, i: number) => (
              page.data.map((model: ModelType, i2: number) => {
                return <ModelCard key={i + '-' + i2} model={model} refetch={refetch} />
              })))}
          </Stack>
          <div ref={ref}></div>
        </Box>
      </Paper>
    </PageContainer>
  )
}

export default InfiniteScrollComponent;