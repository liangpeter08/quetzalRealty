import React from "react";
import { Box, Card, Paper, Stack } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ApiModelModel } from "@/utils/schemas";
import { GetStringAttributeValue, MediaAttribute, StringAttribute } from "@strapi/strapi";
import { BASE_URL } from "@/utils/constants";
import { format } from "path";
import { Label } from "@mui/icons-material";

interface ModelCardProps {
  model: ApiModelModel
}

export default function ModelCard({ model }: ModelCardProps) {
  const { floorplan_name, marketing_floorplan, interior_sf, exterior_sf } = model.attributes
  const marketingFloorplan = marketing_floorplan as any
  return (
    <Paper elevation={24}>
      <Card sx={{ width: 500 }} raised={true}>
        <Paper elevation={10} sx={{ height: 280, m: 3 }}>
          <CardMedia
            sx={{ objectFit: "contain", m: 2, height: '100%', backgroundSize: 'contain' }}
            image={BASE_URL + marketingFloorplan.data?.attributes?.url}
            title="Marketing Floorplan"
          />
        </Paper>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {(floorplan_name as unknown) as string}
          </Typography>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              <strong>Interior Area: </strong>
              {interior_sf + " SF"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Exterior Area: </strong>
              {exterior_sf + " SF"}
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
