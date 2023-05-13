import React from 'react';
import { AppBar, Container, Box, IconButton } from '@mui/material';
import {
  DeleteOutlined as DeleteIcon,
  AddRounded as AddIcon,
  EditNoteRounded as EditNoteIcon
} from '@mui/icons-material';
import { styled } from '@mui/material';
import SearchBox from './SearchBox';

const StyledIconButton = styled(IconButton)({
  flex: '0 0 auto',
  backgroundColor: '#fafaf8',
  borderRadius: '5px',
  padding: '2px 8px',
  color: '#4c4c4c',
  fontSize: '1.5rem',
  '&:hover': {
    backgroundColor: '#85c7f2'
  },
  '&:disabled': {
    background: '#fafaf8'
  }
});

export default function Header() {
  return (
    <AppBar position='static' sx={{ background: '#d1d1d1', padding: '8px 0px' }}>
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex', flexGlow: '1' }}>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <StyledIconButton>
              <AddIcon />
            </StyledIconButton>
            <StyledIconButton>
              <DeleteIcon />
            </StyledIconButton>
            <StyledIconButton>
              <EditNoteIcon />
            </StyledIconButton>
          </Box>
          <Box
            sx={{
              flexGrow: '1',
              display: 'flex',
              justifyContent: 'end'
            }}>
            <SearchBox />
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
