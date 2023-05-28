"use client";

import Link from 'next/link';
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PageContainer from '@/components/container/PageContainer'
import DashboardCard from '@/components/shared/DashboardCard'
import { FullLayout } from '@/components/fullLayout/FullLayout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getProjects } from "./getApi";


export default function Project() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getProjects(),
  });
  return (
    <FullLayout>
    <PageContainer title="Projects" description="projects">
     <DashboardCard title="Projects">
       <TableContainer component={Paper}>
       <Table sx={{ minWidth: 200 }} aria-label="Project table">
         <TableHead>
         <TableRow>
           <TableCell>Project Name sadfasdfa</TableCell>
           <TableCell>Role</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
            {data.map((row : any, i : number) => <TableRow key={i}>
                <TableCell><Link href={'/projects'}>{row?.attributes.project_name}</Link></TableCell>
                <TableCell>{row?.attributes.project_name}</TableCell>
            </TableRow>)}
         </TableBody>
         </Table>
       </TableContainer>
     </DashboardCard>
   </PageContainer>
   </FullLayout> 
  );
}
