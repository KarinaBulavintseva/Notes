import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
import { SearchRounded as SearchIcon } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';

const Search = styled(Box)({
  width: 'min(60%, 300px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 4px',
  backgroundColor: '#fafaf8',
  borderRadius: '8px'
});

const SearchIconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
});

const StyledSearchIcon = styled(SearchIcon)({
  color: '#636363'
});

const StyledInputBase = styled(InputBase)({
  width: '100%',
  '.MuiInputBase-root.MuiInputBase-input': { color: '#636363' }
});

export default function SearchBox() {
  return (
    <Search>
      <SearchIconWrapper>
        <StyledSearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder='Search…' />
    </Search>
  );
}
