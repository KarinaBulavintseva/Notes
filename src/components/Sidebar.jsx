import React, { useContext, useRef } from 'react';
import { Drawer, Box, List } from '@mui/material';
import ListItem from './ListItem';
import IndexedDBContext from '../context/IndexedDBContext';
import SearchBox from './SearchBox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { useScrollbar } from '../hooks/useScrollBar';
import { styled } from '@mui/material';

const StyledBox = styled(Box)({
  '.os-theme-dark.os-scrollbar-vertical > .os-scrollbar-track > .os-scrollbar-handle': {
    backgroundColor: '#d1d1d1'
  }
});

export default function Sidebar() {
  const theme = useTheme();
  const isUpSmallScreens = useMediaQuery(theme.breakpoints.up('sm'));
  const { data, openDrawer, setOpenDrawer } = useContext(IndexedDBContext);

  const listWrapper = useRef(null);
  useScrollbar(listWrapper);

  const notesList = [...data]
    .reverse()
    .map((note) => <ListItem key={note.id} noteData={note}></ListItem>);

  return isUpSmallScreens ? (
    <Drawer
      open={openDrawer}
      variant='permanent'
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' }
      }}>
      <Box sx={{ minHeight: '48px' }} />
      <StyledBox ref={listWrapper}>
        <List sx={{ padding: '0px' }}>{notesList}</List>
      </StyledBox>
    </Drawer>
  ) : (
    <Drawer
      variant='temporary'
      anchor='left'
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        width: 250,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 250, boxSizing: 'border-box' }
      }}>
      <Box
        sx={{
          minHeight: '56px',
          color: 'black'
        }}
      />
      {!isUpSmallScreens && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            borderBottom: '1px solid #d1d1d1',
            padding: '8px 0'
          }}>
          <SearchBox />
        </Box>
      )}
      <Box>
        <List sx={{ padding: '0px' }}>{notesList}</List>
      </Box>
    </Drawer>
  );
}
