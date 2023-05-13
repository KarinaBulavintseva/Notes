import React from 'react';
import { Box } from '@mui/material';
import ReactQuill from 'react-quill';

import { styled } from '@mui/material';

const StyledQuillBox = styled(Box)({
  '.quill': {
    flexGrow: 1
  },
  '.ql-container.ql-snow': {
    fontSize: '18px'
  }
});

export default function Workspace() {
  const modules = { toolbar: null };

  return (
    <Box
      sx={{
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Box
        sx={{
          padding: '8px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#4c4c4c'
        }}>
        May 10, 2018 at 12:00 PM
      </Box>
      <StyledQuillBox sx={{ display: 'flex', flexGrow: '1' }}>
        <ReactQuill modules={modules} theme='snow' />
      </StyledQuillBox>
    </Box>
  );
}
