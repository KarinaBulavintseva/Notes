import React, { useContext } from 'react';
import { ListItem as Item, Box } from '@mui/material';
import { Typography } from '@mui/material';
import { getFormattedDate } from '../utils/utils';
import IndexedDBContext from '../context/IndexedDBContext';
import { getRemainingLines, truncateString, getFirstLine } from '../utils/utils';

export default function ListItem({ noteData }) {
  const { currentId, setCurrentId } = useContext(IndexedDBContext);

  const isCurrent = noteData.id === currentId;

  const firstLine = getFirstLine(noteData.text);
  const truncatedFirstLine = truncateString(firstLine, 20);
  const notePreview = firstLine ? truncatedFirstLine : 'Empty';

  const noteDate = getFormattedDate(noteData.id);

  const remainingLines = getRemainingLines(noteData.text);
  const truncatedRemainingLines = truncateString(remainingLines, 15);
  const remainingLinesPreview = remainingLines ? truncatedRemainingLines : '';

  return (
    <Item
      sx={{
        backgroundColor: isCurrent ? '#d1d1d1' : 'white',
        cursor: 'pointer',
        padding: '0px',
        display: 'flex',
        justifyContent: 'center'
      }}
      onClick={() => setCurrentId(noteData.id)}>
      <Box sx={{ borderBottom: '1px solid #d1d1d1', width: '90%', padding: '5px' }}>
        <Typography sx={{ fontWeight: '700' }}>{notePreview}</Typography>
        <Typography>
          {noteDate} {remainingLinesPreview}
        </Typography>
      </Box>
    </Item>
  );
}
