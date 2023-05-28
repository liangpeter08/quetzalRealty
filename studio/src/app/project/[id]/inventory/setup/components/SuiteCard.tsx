import React from "react";
import { Box, Card, Paper, Stack } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface SuiteCardProps {
  model: any
}

export default function SuiteCard({ model }: SuiteCardProps) {
  return (
    <Paper elevation={24}>
      {JSON.stringify(model)}
      <Card sx={{ width: 500 }} raised={true}>
        <CardMedia
          sx={{ height: 140 }}
          image="/quetzal.svg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {model?.attributes?.floorplan_name}
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
