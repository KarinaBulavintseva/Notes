/* eslint-disable no-restricted-globals */
import React, { useContext } from 'react';
import { AppBar, Container, Box, IconButton } from '@mui/material';
import {
  DeleteOutlined as DeleteIcon,
  AddRounded as AddIcon,
  EditNoteRounded as EditNoteIcon
} from '@mui/icons-material';
import { styled } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import IndexedDBContext from '../context/IndexedDBContext';
import SearchBox from './SearchBox';

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
  const theme = useTheme();
  const isUpSmallScreens = useMediaQuery(theme.breakpoints.up('sm'));

  const {
    addToIndexedDB,
    currentId,
    deleteFromIndexedDB,
    setIsEditing,
    isEditing,
    openDrawer,
    setOpenDrawer
  } = useContext(IndexedDBContext);

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
          {!isUpSmallScreens && (
            <Box>
              <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                {openDrawer ? <KeyboardArrowLeftRoundedIcon /> : <MenuRoundedIcon />}
              </IconButton>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              flexGrow: isUpSmallScreens ? '0' : '1',
              justifyContent: isUpSmallScreens ? 'start' : 'end'
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
          {isUpSmallScreens && (
            <Box
              sx={{
                flexGrow: '1',
                display: 'flex',
                justifyContent: 'end'
              }}>
              <SearchBox />
            </Box>
          )}
        </Box>
      </Container>
    </AppBar>
  );
}
