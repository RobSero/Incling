import React from 'react'
import PropTypes from 'prop-types'

// Third Party Imports
import AllInboxIcon from '@material-ui/icons/AllInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LiveTvIcon from '@material-ui/icons/LiveTv';

/* ------------------------------------------------
       FILTER OPTIONS - HIGHLIGHTS WHEN ACTIVE
--------------------------------------------------*/
function FilterOptions({ currentTileStatus, filterTiles }) {
  return (
    <ul className='filter-list'>
    {/* Server will respond with all tiles when 4 is passed as the paramter */}
      <li id='left-button' className={`filter-list-item ${currentTileStatus === 4 ? 'active' : ''}`} onClick={() => filterTiles(4)}><AllInboxIcon className='filter-icon' /><span className='filter-text'>ALL</span></li>

      <li className={`filter-list-item ${currentTileStatus === 0 ? 'active' : ''}`} onClick={() => filterTiles(0)}><LiveTvIcon className='filter-icon' /><span className='filter-text'>LIVE</span></li>

      <li className={`filter-list-item ${currentTileStatus === 1 ? 'active' : ''}`} onClick={() => filterTiles(1)}><DraftsIcon className='filter-icon' /><span className='filter-text'>DRAFTS</span></li>

      <li className={`filter-list-item ${currentTileStatus === 2 ? 'active' : ''}`} onClick={() => filterTiles(2)}><HourglassEmptyIcon className='filter-icon' /><span className='filter-text'>PENDING</span></li>

      <li id='right-button' className={`filter-list-item ${currentTileStatus === 3 ? 'active' : ''}`} onClick={() => filterTiles(3)}><AllInboxIcon className='filter-icon' /><span className='filter-text'>ARCHIVED</span></li>
    </ul>
  )
}

export default FilterOptions

FilterOptions.propTypes = {
  currentTileStatus: PropTypes.number,
  filterTiles: PropTypes.func.isRequired
}