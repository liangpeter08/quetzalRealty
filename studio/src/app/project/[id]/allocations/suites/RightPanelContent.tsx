import { Autocomplete, Box, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Delete } from '@mui/icons-material'
import { useSuiteSelect } from '@/context/SuiteSelectionContext'
import { any } from "zod";

const RightPanelContent = () => {
  const { selectedSuites, setSelectedSuites } = useSuiteSelect();

  const handleDelete = (id: string) => {
    setSelectedSuites((prev: any) => ({ ...prev, [id]: null }))
  }

  return <Box sx={{ p: 2 }}>
    <Typography variant='h3'>Suites to Allocate</Typography>
    <Divider sx={{ m: 2, marginLeft: -1, marginRight: -1 }} />
    <Autocomplete
      id="broker-search"
      options={['a', 'b', 'c']}
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