import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Autocomplete, Box, FormControl, FormGroup, FormHelperText, IconButton, TextField, InputLabel, Grid, CardMedia, styled, Typography, InputAdornment, CircularProgress, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { uploadCSV } from '@/sharedApi/strapi/uploadCSV';
import { deleteMedia } from '@/sharedApi/strapi/deleteMedia';
import { FileUploader } from "react-drag-drop-files";
import { BASE_URL } from '@/utils/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddPhotoAlternate } from '@mui/icons-material';
import { AdditionalSpace, CreateModelProps, createModel } from '@/sharedApi/strapi/createModel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const fileTypes = ["CSV"];

export interface SuiteUploadModalProps {
    open: boolean;
    onClose: () => void;
    refetch: () => any
    title?: string
    submitText?: string
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

export default function SuiteUploadModal(props: SuiteUploadModalProps) {
    const {
        onClose,
        open,
        refetch,
        title = 'Import Suite Data',
        submitText = 'Submit',
    } = props

    const [isUploaded, setIsUploaded] = useState<boolean>();
    const [isUploadingCSV, setIsUploadingCSV] = useState<boolean>();
    const [file, setFile] = useState<Blob>();
    const [badUpload, setBadUpload] = useState<boolean>();

    const handleClose = () => {
        onClose();
    };

    const handleCSVUpload = async (file: any) => {
        setIsUploadingCSV(true);
        setFile(file);
        setIsUploaded(true);
        setIsUploadingCSV(false);
    }

    const handleCSVDelete = async () => {
        setFile(undefined);
        setIsUploaded(false);
    }


    const submitHandler = async () => {

        if (!file) {
            setBadUpload(true);
        }
        else {
            await uploadCSV(file);
            refetch()
            onClose()
        }
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <Box sx={{ m: 4, marginLeft: 2, marginBottom: 0 }}>
                <DialogTitle sx={{ m: 1 }}><Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="body1">{title}</Typography></DialogTitle>
                <Box sx={{ width: 500, m: 4, justifyContent: 'center' }}>
                    {isUploaded ?
                        <>
                            <Box sx={{ position: 'relative' }}>
                                <IconButton sx={{ position: "absolute" }} onClick={() => handleCSVDelete()}>
                                    <DeleteIcon sx={(theme) => ({ color: theme.palette.primary.dark })} />
                                </IconButton>
                            </Box>
                            <UploadBox>
                                <CheckCircleIcon color='success' fontSize='large'></CheckCircleIcon>
                            </UploadBox>
                        </>
                        :
                        isUploadingCSV
                            ? <UploadBox>
                                <CircularProgress />
                            </UploadBox>
                            :
                            <FileUploader label="Upload Marketing Floorplan" handleChange={handleCSVUpload} name="file" types={fileTypes}>
                                <UploadBox>
                                    <Button sx={{ width: '100%', height: '100%' }} startIcon={<AddPhotoAlternate />} variant="text">Upload Suite Info CSV</Button>
                                </UploadBox>
                            </FileUploader>
                    }
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 3, alignItems: 'center' }}>
                        <Button onClick={submitHandler} type="submit" variant='contained'>{submitText}</Button>
                        {badUpload &&
                            <Alert severity="error">Please Upload CSV File!</Alert>
                        }

                    </Box>
                </Box>
            </Box >
        </Dialog >
    );
}