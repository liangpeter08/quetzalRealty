import { Autocomplete, Box, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Delete } from '@mui/icons-material'

const RightPanelContent = () => {
  return <Box sx={{ p: 2 }}>
    <Typography variant='h3'>Current Suite Allocation</Typography>
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
          <Chip label="Deletable" onClick={() => { }} onDelete={() => { }} deleteIcon={<Delete />} />
        </Stack>
      </Grid>
      <Divider orientation="vertical" flexItem>
      </Divider>
      <Grid item xs>
        <Stack alignItems='center'>
          <Typography variant='body1'>New Allocations</Typography>
          <Chip label="Unit 101" />
        </Stack>
      </Grid>
    </Grid>
  </Box >
};

export default RightPanelContent;