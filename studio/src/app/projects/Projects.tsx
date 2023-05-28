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
import { getProjects } from "../../sharedApi/strapi/getProjects";


export default function ListUsers() {
  const [count, setCount] = React.useState(0);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["initial-users"],
    queryFn: () => getProjects(),
  });
  return (
    <FullLayout showSidebar={false}>
    <PageContainer title="Projects" description="projects">
     <DashboardCard title="Projects">
       <TableContainer component={Paper}>
       <Table sx={{ minWidth: 200 }} aria-label="Project table">
         <TableHead>
         <TableRow>
           <TableCell>Project Name</TableCell>
           <TableCell>Role</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
            {data.map((row : any, i : number) => <TableRow key={i}>
                <TableCell><Link href={'/project/' + row?.attributes.project_name}>{row?.attributes.project_name}</Link></TableCell>
                <TableCell>{JSON.stringify(row?.attributes)}</TableCell>
            </TableRow>)}
         </TableBody>
         </Table>
       </TableContainer>
     </DashboardCard>
   </PageContainer>
   </FullLayout> 
  );
}
