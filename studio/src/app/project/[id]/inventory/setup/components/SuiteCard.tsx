import React from "react";
import { Box,Card, Paper, Stack } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SuiteCard() {
  return (
    <Paper elevation={24}>
    <Card sx={{ width: 500 }} raised={true}>
        <CardMedia
            sx={{ height: 140 }}
            image="/quetzal.svg"
            title="green iguana"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Tower 1
            </Typography>
            <Stack>
            <Typography variant="body2" color="text.secondary">
                dsfasdfsadf
            </Typography>
            </Stack>
        </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Paper>
  );
}
