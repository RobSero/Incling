import React from 'react'
import PropTypes from 'prop-types'

// Third Party Imports
import AllInboxIcon from '@material-ui/icons/AllInbox';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import DraftsIcon from '@material-ui/icons/Drafts';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';


function FilterOptions({ filteredTileStatus, filterTiles }) {
  return (
    <ul className='filter-list'>
      <li id='left-button' className={`filter-list-item ${filteredTileStatus === 4 ? 'active' : ''}`} onClick={() => filterTiles(4)}><AllInboxIcon className='filter-icon' /><span class='filter-text'>ALL</span></li>
      <li className={`filter-list-item ${filteredTileStatus === 0 ? 'active' : ''}`} onClick={() => filterTiles(0)}><LiveTvIcon className='filter-icon' /><span class='filter-text'>LIVE</span></li>
      <li className={`filter-list-item ${filteredTileStatus === 1 ? 'active' : ''}`} onClick={() => filterTiles(1)}><DraftsIcon className='filter-icon' /><span class='filter-text'>DRAFTS</span></li>
      <li className={`filter-list-item ${filteredTileStatus === 2 ? 'active' : ''}`} onClick={() => filterTiles(2)}><HourglassEmptyIcon className='filter-icon' /><span class='filter-text'>PENDING</span></li>
      <li id='right-button' className={`filter-list-item ${filteredTileStatus === 3 ? 'active' : ''}`} onClick={() => filterTiles(3)}><AllInboxIcon className='filter-icon' /><span class='filter-text'>ARCHIVED</span></li>
    </ul>
  )
}

export default FilterOptions

FilterOptions.propTypes = {
  filteredTileStatus: PropTypes.number,
  filterTiles: PropTypes.func.isRequired
}