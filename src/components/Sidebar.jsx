import React from 'react';
import { Drawer, Box, List, ListItem, ListItemText } from '@mui/material';

export default function Sidebar() {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 300,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' }
      }}>
      <Box sx={{ minHeight: '50px' }} />
      <Box>
        <List sx={{ padding: '0px' }}>
          {[
            'Note1',
            'Note2',
            'Note3',
            'Note4',
            'Note5',
            'Note6',
            'Note7',
            'Note8',
            'Note9',
            'Note10',
            'Note11',
            'Note12',
            'Note13'
          ].map((text) => (
            <ListItem
              key={text}
              sx={{
                cursor: 'pointer'
              }}>
              <Box>
                <ListItemText primary={text} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
