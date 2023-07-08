import { Autocomplete, Box, Button, Chip, Divider, Grid, Stack, TextField, Typography, Container, Alert } from "@mui/material";
import { Delete } from '@mui/icons-material'
import { useSuiteSelect } from '@/context/SuiteSelectionContext'
import { any } from "zod";
import { useQuery } from "@tanstack/react-query";
import { getBrokers, BROKERS_KEY } from "@/sharedApi/strapi/getBrokers";
import { useState } from "react";
import { createAllocation } from "@/sharedApi/strapi/allocations/createAllocation";
import LinearProgress from '@mui/material/LinearProgress';


enum ErrorState {
  NO_BROKER,
  API_FAIL,
  NO_ERROR,
  NO_SUITE,
}

const RightPanelContent = ({ refetchTable }: { refetchTable: () => void }) => {
  const { selectedSuites, setSelectedSuites } = useSuiteSelect();
  const [q, setQ] = useState('');
  const [selectedBroker, setSelectedBroker] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isError, setIsError] = useState<ErrorState>()
  const [isSuccessful, setIsSuccessful] = useState<boolean>()

  const handleDelete = (id: string) => {
    setSelectedSuites((prev: any) => {
      const newVal = { ...prev }
      delete newVal[id]
      return newVal
    })
  }

  const { data: brokerData, isLoading: brokerLoading } = useQuery({
    queryFn: () => getBrokers(q ? {
      filters: {
        "first_name": {
          "$startsWithi": q
        }
      },
    } : {}),
    queryKey: [BROKERS_KEY, q]
  });

  const createAllocationsHandler = async () => {
    console.log('broker', selectedBroker)
    setIsError(ErrorState.NO_ERROR)
    if (!selectedBroker) {
      setIsError(ErrorState.NO_BROKER)
      return;
    }
    if (!Object.keys(selectedSuites)) {
      setIsError(ErrorState.NO_SUITE)
      return;
    }
    setIsLoading(true)
    for (const suiteId in selectedSuites) {
      console.log(selectedSuites[suiteId])
      if (!selectedSuites[suiteId]) {
        continue;
      }
      const req = {
        brokerId: selectedBroker.id,
        suiteId: selectedSuites[suiteId].original.id,
      }
      try {
        await createAllocation(req)
      } catch (err) {
        console.error(err)
        setIsError(ErrorState.API_FAIL)
        return;
      }
    }
    setIsSuccessful(true)
    setSelectedSuites({})
    setSelectedBroker(null)
    setIsLoading(false)
    refetchTable()
  }
  console.log('brokerData', brokerData, q);

  const errorElement = () => {
    switch (isError) {
      case ErrorState.API_FAIL:
        return <Alert variant="filled" severity="error">
          <Typography color={"white"}>
            Allocations did not succeed, Please try again!
          </Typography>
        </Alert>
      case ErrorState.NO_BROKER:
        return <Alert variant="filled" severity="error">
          <Typography color={"white"}>
            Please Select a broker
          </Typography>
        </Alert>
    }
    return;
  }

  return <Box sx={{ p: 2 }} height='100vh'>
    {(isLoading || brokerLoading) && <LinearProgress />}
    {errorElement()}
    {isSuccessful && <Alert variant="filled" severity="success">
      <Typography color="white"> Allocation succeeded! </Typography>
    </Alert>}
    <Typography variant='h3'>Suites to Allocate</Typography>
    <Divider sx={{ m: 2, marginLeft: -1, marginRight: -1 }} />
    <Autocomplete
      id="broker-search"
      options={brokerData?.data ?? []}
      getOptionLabel={(option) => (option.attributes.first_name as unknown) as string}
      inputValue={q}
      onChange={(evt, value) => {
        console.log('onchange', value)
        setSelectedBroker(value)
      }}
      onInputChange={(event, newInputValue) => {
        setQ(newInputValue)
      }}
      renderInput={(params) => <TextField {...params} label="Select Broker" />}
    />
    <Typography variant='h3' sx={{ m: 2, textAlign: 'center' }}>Suites</Typography>
    <Grid container>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body1' textAlign='center'>New Allocations</Typography>
          </Grid>
          {
            Object.values(selectedSuites).map((item: any) => {
              if (!item) {
                return;
              }
              const suiteNumber = item.getValue('marketing_suite_number')
              return <Grid item><Chip
                id={item.id}
                label={suiteNumber}
                onClick={() => handleDelete(item.id)}
                onDelete={() => handleDelete(item.id)}
                deleteIcon={<Delete />} /></Grid>
            })
          }

        </Grid>
      </Grid>
      <Divider orientation="vertical" flexItem>
      </Divider>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body1' textAlign='center'>Existing Allocations</Typography>
          </Grid>
          <Grid item>
            <Chip label="1001" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Container sx={{
      position: 'absolute',
      bottom: '10%',
      display: 'flex',
      'justifyContent': 'center'
    }}>
      <Button
        variant="contained" onClick={createAllocationsHandler} >
        Allocate Suites
      </Button>
    </Container>
  </Box >
};

export default RightPanelContent;