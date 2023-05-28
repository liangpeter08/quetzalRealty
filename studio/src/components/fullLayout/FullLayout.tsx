import { useState } from 'react';
import { styled, Container, Box } from '@mui/material';

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

export const FullLayout = ({ children, showSidebar = true }: any) => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <MainWrapper
      className='mainwrapper'
    >
      {
        showSidebar &&
        <Sidebar isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)} />
      }
      <PageWrapper
        className="page-wrapper"
      >
        <Header showSidebar={showSidebar} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '2000px'
        }}
          maxWidth={false}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            {children}
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};
