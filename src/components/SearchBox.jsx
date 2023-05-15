import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
import { SearchRounded as SearchIcon } from '@mui/icons-material';
import InputBase from '@mui/material/InputBase';
import IndexedDBContext from '../context/IndexedDBContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

const Search = styled(Box)({
  width: 'min(80%, 300px)',
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
  width: '100%'
});

export default function SearchBox() {
  const theme = useTheme();
  const isUpSmallScreens = useMediaQuery(theme.breakpoints.up('sm'));
  const { filterData } = useContext(IndexedDBContext);
  return (
    <Search sx={{ border: isUpSmallScreens ? 'none' : '1px solid #d1d1d1' }}>
      <SearchIconWrapper>
        <StyledSearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder='Search…' onChange={(event) => filterData(event.target.value)} />
    </Search>
  );
}
