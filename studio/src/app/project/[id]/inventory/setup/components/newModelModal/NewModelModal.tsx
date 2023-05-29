import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, FormControl, FormGroup, FormHelperText, IconButton, TextField, InputLabel, Grid, CardMedia, styled, Typography, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { uploadMedia } from '@/sharedApi/strapi/uploadMedia';
import { FileUploader } from "react-drag-drop-files";
import { PluginUploadFile } from '@/utils/schemas';
import { BASE_URL } from '@/utils/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPhotoAlternate } from '@mui/icons-material';
import { createModel } from '@/sharedApi/strapi/createModel';

const fileTypes = ["JPG", "PNG", "GIF"];

export interface NewSuiteModalProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
  refetch: () => any
}

const UploadBox = styled(Box)(({ theme }) => ({
  borderStyle: 'dashed',
  p: 3,
  borderWidth: '3px',
  borderColor: theme.palette.primary.main,
  width: '100%',
  height: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
}))

export default function NewSuiteModal({ onClose, selectedValue, open, refetch }: NewSuiteModalProps) {
  const [marketingFloorplan, setMarketingFloorplan] = useState<PluginUploadFile['attributes']>();
  const [legalFloorplan, setLegalFloorplan] = useState<PluginUploadFile['attributes']>();


  const handleClose = () => {
    onClose();
  };

  const handleMarketingUpload = async (file: any) => {
    const newFile = await uploadMedia(file)
    setMarketingFloorplan(newFile)
  }

  const handleLegalUpload = async (file: any) => {
    const newFile = await uploadMedia(file)
    setLegalFloorplan(newFile)
  }

  const submitHandler = async () => {
    await createModel({} as any);
    await refetch()
    onClose()

  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ m: 4, marginLeft: 2, marginBottom: 0 }}>
        <DialogTitle sx={{ m: 1 }}><Typography variant="h3"> Add New Product </Typography></DialogTitle>
        <Box sx={{ width: 500, m: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormGroup>
                <TextField label='Floorplan Name' aria-describedby="name-helper-text" />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <TextField type="number" label='Bedroom Count' aria-describedby="beds-helper-text" />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <TextField type="number" label='Bathroom Count' aria-describedby="baths-helper-text" />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <TextField label="Interior Area" aria-describedby="interior-area-helper-text" InputProps={{
                  endAdornment: <InputAdornment position="end">Sq ft.</InputAdornment>,
                }} />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <FormGroup>
                <TextField label='Exterior Area' aria-describedby="exterior-area-helper-text" InputProps={{
                  endAdornment: <InputAdornment position="end">Sq ft.</InputAdornment>,
                }} />
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              {marketingFloorplan ?
                <CardMedia
                  sx={{ objectFit: "cover", height: 200, backgroundSize: 'cover' }}
                  image={BASE_URL + marketingFloorplan?.url}
                  title="Marketing Floorplan"
                />
                :
                <FileUploader label="Upload Marketing Floorplan" handleChange={handleMarketingUpload} name="file" types={fileTypes}>
                  <UploadBox>
                    <Button sx={{ width: '100%', height: '100%' }} startIcon={<AddPhotoAlternate />} variant="text">Upload Marketing Floorplan</Button>
                  </UploadBox>
                </FileUploader>
              }
            </Grid>
            <Grid item xs={6}>
              {legalFloorplan ?
                <CardMedia
                  sx={{ objectFit: "cover", height: 200, backgroundSize: 'cover' }}
                  image={BASE_URL + legalFloorplan?.url}
                  title="Marketing Floorplan"
                />
                :
                <FileUploader handleChange={handleLegalUpload} name="file" types={fileTypes}>
                  <UploadBox>
                    <Button sx={{ width: '100%', height: '100%' }} startIcon={<AddPhotoAlternate />} variant="text">Upload Legal Floorplan</Button>
                  </UploadBox>
                </FileUploader>
              }
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button onClick={submitHandler} variant='contained'>Submit</Button>
          </Box>
        </Box>
      </Box>
    </Dialog >
  );
}