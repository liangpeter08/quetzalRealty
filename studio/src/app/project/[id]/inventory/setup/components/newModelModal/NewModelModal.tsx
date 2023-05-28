import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, FormControl, FormGroup, FormHelperText, IconButton, Input, InputLabel, Grid, CardMedia } from '@mui/material';
import React, { useState } from 'react';
import { uploadMedia } from '@/sharedApi/strapi/uploadMedia';
import { FileUploader } from "react-drag-drop-files";
import { PluginUploadFile } from '@/utils/schemas';
import { BASE_URL } from '@/utils/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPhotoAlternate } from '@mui/icons-material';

const fileTypes = ["JPG", "PNG", "GIF"];

export interface NewSuiteModalProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export default function NewSuiteModal(props: NewSuiteModalProps) {
  const { onClose, selectedValue, open } = props;
  const [marketingFloorplan, setMarketingFloorplan] = useState<PluginUploadFile['attributes']>();
  const [legalFloorplan, setLegalFloorplan] = useState<PluginUploadFile['attributes']>();


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleMarketingUpload = async (file: any) => {
    const newFile = await uploadMedia(file)
    setMarketingFloorplan(newFile)
  }

  const handleLegalUpload = async (file: any) => {
    const newFile = await uploadMedia(file)
    setMarketingFloorplan(newFile)
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
          <Grid item xs={6}>
            {marketingFloorplan ?
              <CardMedia
                sx={{ objectFit: "contain", m: 2, height: 200, backgroundSize: 'contain' }}
                image={BASE_URL + marketingFloorplan?.url}
                title="Marketing Floorplan"
              />
              :
              <FileUploader label="Upload Marketing Floorplan" handleChange={handleMarketingUpload} name="file" types={fileTypes}>
                <Box sx={(theme) => ({ borderStyle: 'dotted ', borderWidth: '3px', borderColor: theme.palette.primary.main })}>
                  <Button startIcon={<AddPhotoAlternate />} variant="text">Upload Marketing Floorplan</Button>
                </Box>
              </FileUploader>
            }
          </Grid>
          <Grid item xs={6}>
            {legalFloorplan ?
              <CardMedia
                sx={{ objectFit: "contain", m: 2, height: 200, backgroundSize: 'contain' }}
                image={BASE_URL + legalFloorplan?.url}
                title="Marketing Floorplan"
              />
              :
              <FileUploader handleChange={handleLegalUpload} name="file" types={fileTypes}>
                <Box sx={(theme) => ({ borderStyle: 'dotted ', borderWidth: '3px', borderColor: theme.palette.primary.main })}>
                  <Button startIcon={<AddPhotoAlternate />} variant="text">Upload Legal Floorplan</Button>
                </Box>
              </FileUploader>
            }
          </Grid>
        </Grid>
      </Box>
    </Dialog >
  );
}