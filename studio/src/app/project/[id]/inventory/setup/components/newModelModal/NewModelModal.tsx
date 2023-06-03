import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Autocomplete, Box, FormControl, FormGroup, FormHelperText, IconButton, TextField, InputLabel, Grid, CardMedia, styled, Typography, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { uploadMedia } from '@/sharedApi/strapi/uploadMedia';
import { deleteMedia } from '@/sharedApi/strapi/deleteMedia';
import { FileUploader } from "react-drag-drop-files";
import { BASE_URL } from '@/utils/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPhotoAlternate } from '@mui/icons-material';
import { AdditionalSpace, CreateModelProps, createModel } from '@/sharedApi/strapi/createModel';
import { useForm, Controller, useFieldArray, FieldError } from "react-hook-form";
import { updateModel } from '@/sharedApi/strapi/updateModel';
import { ModelType } from '@/sharedApi/strapi/getInventory';

const fileTypes = ["JPG", "PNG", "GIF"];
const additionalSpaceOptions: (AdditionalSpace | null)[] = ['Study', 'Flex', 'Den'];

export interface NewSuiteModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => any
  title?: string
  submitText?: string
  formValues?: ModelType
  isUpdate?: boolean
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
  borderRadius: 10,
}))


type CreateFieldRestrict = {
  [k in keyof CreateModelProps]?: any
}


function getUnitType({ beds, baths, type, additional_space }: CreateModelProps) {
  if (type) {
    return type;
  }
  let str = `${beds} Bed`
  if (additional_space) {
    str += ' + ' + additional_space
  }
  str += ` + ${baths} Bath`
  return str;
}

const missingField: CreateFieldRestrict = {
  floorplan_name: {
    required: "Floorplan Name Is Required"
  },
  beds: {
    required: "Number of Bedrooms is Required",
    min: "Cannot Be Negative"
  },
  baths: {
    required: "Number of Bedrooms is Required",
    min: "Cannot Be Less Than 1"
  },
  interior_sf: {
    required: "Interior Area is Required",
    min: "Cannot Be Negative"
  },
  exterior_sf: {
    required: "Exterior Area is Required",
    min: "Cannot Be Negative"
  },
};

export default function NewModelModal(props: NewSuiteModalProps) {
  const {
    onClose,
    open,
    refetch,
    title = 'Add New Product',
    submitText = 'Submit',
    formValues,
    isUpdate
  } = props

  const [marketingFloorplan, setMarketingFloorplan] = useState<any>(

  );
  const [legalFloorplan, setLegalFloorplan] = useState<any>();
  const { control, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm({ reValidateMode: "onBlur", defaultValues: formValues?.['attributes'] });

  useEffect(() => {
    reset()
    const marketingFloorplanValue: any = formValues?.attributes.marketing_floorplan;
    const legalFloorplanValue: any = formValues?.attributes.legal_floorplan;
    setMarketingFloorplan(marketingFloorplanValue ? {
      id: marketingFloorplanValue?.data?.id,
      ...marketingFloorplanValue?.data?.attributes
    } : null)
    setLegalFloorplan(legalFloorplanValue ? {
      id: legalFloorplanValue?.data?.id,
      ...legalFloorplanValue?.data?.attributes
    } : null)

  }, [isSubmitSuccessful, reset])

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

  const handleMarketingFloorplanDelete = async () => {
    deleteMedia(marketingFloorplan?.id)
    setMarketingFloorplan(null)
  }

  const handleLegalFloorplanDelete = async () => {
    deleteMedia(legalFloorplan?.id)
    setLegalFloorplan(null)
  }

  const submitHandler = async (data: any) => {
    const { beds, baths, interior_sf, exterior_sf, floorplan_name, additional_space } = data
    const modifiedData: CreateModelProps = {
      project: { "disconnect": [], "connect": [{ "id": 1, "position": { "end": true } }] },
      beds: parseInt(beds, 10),
      baths: parseInt(baths, 10),
      additional_space,
      type: getUnitType(data),
      interior_sf: parseInt(interior_sf, 10),
      exterior_sf: parseInt(exterior_sf, 10),
      floorplan_name,
      marketing_floorplan: marketingFloorplan?.id,
      legal_floorplan: legalFloorplan?.id,
    }
    if (isUpdate) {
      if (!formValues?.id) {
        onClose()
        return
      }
      await updateModel(modifiedData, formValues.id);
    } else {
      await createModel(modifiedData);
    }

    await refetch()
    onClose()
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ m: 4, marginLeft: 2, marginBottom: 0 }}>
        <DialogTitle sx={{ m: 1 }}><Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="body1">{title}</Typography></DialogTitle>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Box sx={{ width: 500, m: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormGroup>
                  <Controller control={control} rules={{ required: true }} name="floorplan_name" render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label='Floorplan Name' aria-describedby="floorplan-name-helper-text" error={error !== undefined}
                      helperText={!!error && missingField.floorplan_name[error.type]} />)} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <Controller control={control} rules={{ required: true, min: 0 }} name="beds" render={({ field, fieldState: { error } }) => (
                    <TextField {...field} type="number" label='Bedroom Count' aria-describedby="beds-helper-text"
                      InputProps={{ inputProps: { min: 0 } }}
                      error={error !== undefined}
                      helperText={!!error && missingField.beds[error.type]} />)} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <Controller control={control} rules={{ required: true, min: 1 }} name="baths" render={({ field, fieldState: { error } }) => (
                    <TextField {...field} type="number" label='Bathroom Count' aria-describedby="baths-helper-text"
                      InputProps={{ inputProps: { min: 1 } }}
                      error={error !== undefined}
                      helperText={!!error && missingField.baths[error.type]} />)} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <Controller control={control} name="additional_space" render={({ field: { ref, onChange, ...field } }) => (
                    <Autocomplete
                      options={additionalSpaceOptions}
                      onChange={(_, data) => onChange(data)}
                      defaultValue={null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...field}
                          inputRef={ref}
                          label="Additional Space"
                          aria-describedby='additional-space-helper-text'
                        />
                      )}
                    />
                  )} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <Controller control={control} name="type" render={({ field }) => (
                    <TextField {...field} label='Type (Optional)' aria-describedby="type-helper-text" />)} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <Controller control={control} rules={{ required: true, min: 0 }} name="interior_sf" render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label="Interior Area" aria-describedby="interior-area-helper-text"
                      error={error !== undefined}
                      helperText={!!error && missingField.interior_sf[error.type]}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SF</InputAdornment>
                      }} />)} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <Controller control={control} rules={{ required: true, min: 0 }} name="exterior_sf" render={({ field, fieldState: { error } }) => (
                    <TextField {...field} label='Exterior Area' aria-describedby="exterior-area-helper-text"
                      error={error !== undefined}
                      helperText={!!error && missingField.exterior_sf[error.type]}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SF</InputAdornment>
                      }}
                    />)} />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                {marketingFloorplan ?
                  <Box sx={{ position: 'relative' }}>
                    <IconButton sx={{ position: "absolute" }} onClick={() => handleMarketingFloorplanDelete()}>
                      <DeleteIcon sx={(theme) => ({ color: theme.palette.primary.dark })} />
                    </IconButton>
                    <CardMedia
                      sx={(theme) => ({ objectFit: "cover", height: 200, backgroundSize: 'cover', border: `1px solid ${theme.palette.grey['600']}`, borderRadius: "10px" })}
                      image={BASE_URL + marketingFloorplan?.url}
                      title="Marketing Floorplan"
                    />
                  </Box>
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
                  <Box sx={{ position: 'relative' }}>
                    <IconButton sx={{ position: "absolute" }} onClick={() => handleLegalFloorplanDelete()}>
                      <DeleteIcon sx={(theme) => ({ color: theme.palette.primary.dark })} />
                    </IconButton>
                    <CardMedia
                      sx={{ objectFit: "cover", height: 200, backgroundSize: 'cover' }}
                      image={BASE_URL + legalFloorplan?.url}
                      title="Legal Floorplan"
                    />
                  </Box>
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
              <Button type="submit" variant='contained'>{submitText}</Button>
            </Box>
          </Box>
        </form>
      </Box >
    </Dialog >
  );
}