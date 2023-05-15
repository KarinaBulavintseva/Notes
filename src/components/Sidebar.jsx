import React, { useContext } from 'react';
import { Drawer, Box, List } from '@mui/material';
import ListItem from './ListItem';
import IndexedDBContext from '../context/IndexedDBContext';

export default function Sidebar() {
  const { data } = useContext(IndexedDBContext);

  const dataLength = data.length;

  const notesList = [...data]
    .reverse()
    .map((note) => <ListItem key={note.id} noteData={note}></ListItem>);
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' }
      }}>
      <Box sx={{ minHeight: '50px' }} />
      {dataLength ? (
        <Box>
          <List sx={{ padding: '0px' }}>{notesList}</List>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', padding: '10px 5px', color: '#636363' }}>
          You haven't added any note yet!
        </Box>
      )}
    </Drawer>
  );
}
