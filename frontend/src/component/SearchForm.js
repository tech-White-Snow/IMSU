import React from 'react'
import {IconButton, TextField  } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

export default function SearchForm() {
  return (
        <div className='search-form'>
          <TextField
            variant="outlined"
            // value={}
            // onChange={}
          />

          <IconButton  aria-label="search"  className="search-btn blue-btn">
            <SearchIcon />
          </IconButton>
        </div>
  )
}
