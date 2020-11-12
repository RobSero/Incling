import React from 'react'
import { Link } from 'react-router-dom'

// Component Imports
import LaunchDate from '../common/LaunchDate'
import TileStatusSelect from '../common/TileStatusSelect'

// Third Party Imports
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';


/* ------------------------------------------------
          DISPLAYS WHEN TILE HAS NO TASKS
--------------------------------------------------*/
function EmptyTile({id, launch_date, updateTileDate, deleteTile, currentStatus, changeTileStatus}) {
  return (
    <div className='tile-container empty-tile animate__animated animate__fadeIn'>
        <TileStatusSelect currentStatus={currentStatus} id={id} changeTileStatus={changeTileStatus} />
        <div className='edit-tile-buttons'>
          <DeleteIcon className='icon-sml' onClick={() => { deleteTile(id) }} />
        </div>
        <div className='empty-tile-details'>
          <p>No tasks in your tile...yet!</p>
          <Link to={`/tiles/${id}/newtask`}><AddCircleOutlineIcon className='icon-med' /></Link>
        </div>
        <LaunchDate id={id} launch_date={launch_date} updateTileDate={updateTileDate} />
      </div>
  )
}

export default EmptyTile
