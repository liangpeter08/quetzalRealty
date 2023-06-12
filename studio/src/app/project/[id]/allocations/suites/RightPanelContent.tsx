import { Autocomplete, Box, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Delete } from '@mui/icons-material'
import { useSuiteSelect } from '@/context/SuiteSelectionContext'
import { any } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getBrokers, BROKERS_KEY } from "@/sharedApi/strapi/getBrokers";
import { useState } from "react";

const RightPanelContent = () => {
  const { selectedSuites, setSelectedSuites } = useSuiteSelect();
  const [q, setQ] = useState('');

  const handleDelete = (id: string) => {
    setSelectedSuites((prev: any) => ({ ...prev, [id]: null }))
  }

  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryFn: () => getBrokers(q ? {
      filters: {
        "first_name": {
          "$startsWithi": q
        }
      },
    } : {}),
    queryKey: [BROKERS_KEY, q]
  });

  console.log(data);

  return <Box sx={{ p: 2 }}>
    <Typography variant='h3'>Suites to Allocate</Typography>
    <Divider sx={{ m: 2, marginLeft: -1, marginRight: -1 }} />
    <Autocomplete
      id="broker-search"
      options={data?.data ?? []}
      getOptionLabel={(option) => (option.attributes.first_name as unknown) as string}
      inputValue={q}
      onInputChange={(event, newInputValue) => {
        setQ(newInputValue)
      }}
      renderInput={(params) => <TextField {...params} label="Select Broker" />}
    />
    <Typography variant='h3' sx={{ m: 2, textAlign: 'center' }}>Suites</Typography>
    <Grid container>
      <Grid item xs>
        <Stack alignItems='center'>
          <Typography variant='body1'>New Allocations</Typography>
          {
            Object.values(selectedSuites).map((item: any) => {
              if (!item) {
                return;
              }
              const suiteNumber = item.getValue('marketing_suite_number')
              console.log(item.id)
              return < Chip
                id={item.id}
                label={suiteNumber}
                onClick={() => handleDelete(item.id)}
                onDelete={() => handleDelete(item.id)}
                deleteIcon={<Delete />} />
            })
          }

        </Stack>
      </Grid>
      <Divider orientation="vertical" flexItem>
      </Divider>
      <Grid item xs>
        <Stack alignItems='center'>
          <Typography variant='body1'>Existing Allocations</Typography>
          <Chip label="Unit 101" />
        </Stack>
      </Grid>
    </Grid>
  </Box >
};

export default RightPanelContent;