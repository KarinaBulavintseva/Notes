import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';

const Wrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
});

function App() {
  return (
    <>
      <CssBaseline />
      <Wrapper>
        <Header />
        <Box sx={{ display: 'flex', flexGrow: '1' }}>
          <Sidebar />
          <Workspace />
        </Box>
      </Wrapper>
    </>
  );
}

export default App;
