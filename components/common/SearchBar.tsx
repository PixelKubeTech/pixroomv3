import React from 'react'
import Button from './Button'
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className='flex justify-between w-2/5 border rounded mr-8 items-center'>
      <input className='w-full mx-2 focus:outline-none' placeholder="*ID, *Connector Name*, account*" />
      <Button>
        <SearchIcon />
      </Button>
    </div>
  )
}

export default SearchBar