/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import { AppBar, Container, Box, IconButton } from '@mui/material';
import {
  DeleteOutlined as DeleteIcon,
  AddRounded as AddIcon,
  EditNoteRounded as EditNoteIcon
} from '@mui/icons-material';
import { styled } from '@mui/material';
import IndexedDBContext from '../context/IndexedDBContext';

const StyledIconButton = styled(IconButton)({
  flex: '0 0 auto',
  backgroundColor: '#fafaf8',
  borderRadius: '5px',
  padding: '2px 8px',
  color: '#4c4c4c',
  fontSize: '1.5rem',
  '&:hover': {
    backgroundColor: '#fafaf8'
  },
  '&:disabled': {
    background: '#fafaf8'
  }
});

export default function Header() {
  const { addToIndexedDB, currentId, deleteFromIndexedDB, setIsEditing, isEditing } =
    useContext(IndexedDBContext);

  const deleteElement = () => {
    const deleteElement = confirm('Delete note?');
    if (deleteElement) {
      deleteFromIndexedDB(currentId);
    }
  };
  return (
    <AppBar
      position='static'
      sx={{
        background: '#d1d1d1',
        padding: '8px 0px',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}>
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              display: 'flex',
              gap: '8px'
            }}>
            <StyledIconButton onClick={addToIndexedDB}>
              <AddIcon />
            </StyledIconButton>
            <StyledIconButton onClick={deleteElement} disabled={!currentId}>
              <DeleteIcon />
            </StyledIconButton>
            <StyledIconButton
              onClick={() => setIsEditing(!isEditing)}
              disabled={!currentId}
              sx={{ backgroundColor: isEditing ? '#85c7f2' : '#fafaf8' }}>
              <EditNoteIcon />
            </StyledIconButton>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
