import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import styled from '@emotion/styled';
import { Box, FormControl, FormGroup, FormHelperText, IconButton, Input, InputLabel, Grid } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import React from 'react';
import { uploadMedia } from '@/sharedApi/strapi/uploadMedia';

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

  const handleUploadClick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    const firstFile = files?.item(0)
    if (!files || !firstFile) {
      return;
    }

    const imageType = /image.*/

    if (!firstFile.type.match(imageType)) {
      return
    }
    await uploadMedia(firstFile)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Setup New Suite Type</DialogTitle>
      <Box sx={{ width: 500, m: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input id="name" aria-describedby="name-helper-text" />
              </FormControl>
            </FormGroup>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" component="label">
              Upload
              <input
                hidden
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleUploadClick}
              />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog >
  );
}