import React, { useContext, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import IndexedDBContext from '../context/IndexedDBContext';
import { styled } from '@mui/material';
import { getFullDate } from '../utils/utils';

const StyledTextField = styled(Box)({
  outline: 'none',
  flexGrow: '1',
  resize: 'none',
  border: 'none',
  fontSize: '18px'
});

export default function Workspace() {
  const { data, updateInIndexedDB, currentId, isEditing } = useContext(IndexedDBContext);

  const [text, setText] = useState('');

  useEffect(() => {
    const currentElement = data.find((item) => item.id === currentId);

    if (currentElement) {
      setText(currentElement.text);
    }

    if (!data.length || !currentElement) {
      setText('');
    }
  }, [currentId, data]);

  const date = getFullDate(currentId);

  const changeText = (event) => {
    const noteText = event.target.value;
    setText(noteText);
    updateInIndexedDB(currentId, noteText);
  };

  return (
    <Box
      sx={{
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column'
      }}>
      {currentId && (
        <Box
          sx={{
            padding: '8px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#636363'
          }}>
          {date}
        </Box>
      )}
      <Box sx={{ display: 'flex', flexGrow: '1', padding: '20px 30px' }}>
        <StyledTextField
          component='textarea'
          value={text}
          onChange={changeText}
          readOnly={!isEditing}></StyledTextField>
      </Box>
    </Box>
  );
}
