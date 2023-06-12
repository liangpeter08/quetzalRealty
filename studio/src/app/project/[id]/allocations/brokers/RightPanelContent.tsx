import { Autocomplete, Box, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { Delete } from '@mui/icons-material'
import { useSuiteSelect } from '@/context/SuiteSelectionContext'
import { useEffect, useState } from "react";

const RightPanelContent = () => {
  // selectedItem
  const { selectedSuites, setSelectedSuites } = useSuiteSelect();
  const [selected, setSelected] = useState<any>();


  const handleDelete = (id: string) => {
    setSelectedSuites((prev: any) => ({ ...prev, [id]: null }))
  }
  console.log(selectedSuites);

  return <Box sx={{ p: 2 }}>
    <Typography variant='h3'>Current Suite Allocation</Typography>
    <Divider sx={{ m: 2, marginLeft: -1, marginRight: -1 }} />
    <Autocomplete
      id="broker-search"
      options={['a', 'b', 'c']}
      renderInput={(params) => <TextField {...params} label="Select Broker" />}
    />
    <Typography variant='h3' sx={{ m: 2, textAlign: 'center' }}>Suites</Typography>

    <Stack alignItems='center' spacing={3}>
      {
        Object.values(selectedSuites).map((item: any) => {
          if (!item) {
            return;
          }
          // const suiteNumber = item.getValue('marketing_suite_number')
          return <Chip
            id={item.id}
            label={'sdfsdf'}
            onClick={() => handleDelete(item.id)}
            onDelete={() => handleDelete(item.id)}
            deleteIcon={<Delete />} />
        })
      }

    </Stack>

  </Box >
};

export default RightPanelContent;