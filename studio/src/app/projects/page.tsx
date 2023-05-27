'use client';
import React from 'react'
import PageContainer from '@/components/container/PageContainer'
import DashboardCard from '@/components/shared/DashboardCard'
import { Typography } from '@mui/material';
import { FullLayout } from '@/components/fullLayout/FullLayout';

export default function Page() {
  return (
    <FullLayout>
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
    </FullLayout>
  )
}
