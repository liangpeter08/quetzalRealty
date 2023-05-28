import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, FormControl, FormGroup, FormHelperText, IconButton, Input, InputLabel, Grid } from '@mui/material';
import React from 'react';
import { uploadMedia } from '@/sharedApi/strapi/uploadMedia';
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export interface NewSuiteModalProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function NewSuiteModal(props: NewSuiteModalProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleUploadClick = async (file: any) => {
    await uploadMedia(file)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add New Product</DialogTitle>
      <Box sx={{ width: 500, m: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="name">Floorplan Name</InputLabel>
                <Input id="name" aria-describedby="name-helper-text" />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="beds">Bedroom Count</InputLabel>
                <Input id="beds" aria-describedby="beds-helper-text" />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="baths">Bathroom Count</InputLabel>
                <Input id="baths" aria-describedby="baths-helper-text" />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="interior_area">Interior Area</InputLabel>
                <Input id="interior_area" aria-describedby="interior-area-helper-text" />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="exterior_area">Exterior Area</InputLabel>
                <Input id="exterior_area" aria-describedby="exterior-area-helper-text" />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <FileUploader handleChange={handleUploadClick} name="file" types={fileTypes} />
          </Grid>
        </Grid>
      </Box>
    </Dialog >
  );
}