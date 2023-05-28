import { useState } from 'react';
import { styled, Container, Box } from '@mui/material';

import { CssBaseline, ThemeProvider } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { baselightTheme } from "../../theme/DefaultColors";
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar';


const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

const queryClient = new QueryClient()

export const FullLayout = ({ children }: any) => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={baselightTheme}>
    <CssBaseline />
    <MainWrapper
      className='mainwrapper'
    >
      <Sidebar isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />
      <PageWrapper
        className="page-wrapper"
      >
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '1200px',
        }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
    </ThemeProvider>
    </QueryClientProvider>
  );
};
