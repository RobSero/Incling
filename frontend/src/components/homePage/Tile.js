import React from 'react'
import { Link } from 'react-router-dom'
import TileStatusSelect from '../common/TileStatusSelect'
import LaunchDate from '../common/LaunchDate'
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { taskTypes } from '../../utils/taskTypes'


function Tile({ tasks, id, launch_date, status, changeTileStatus, deleteTile, updateTileDate }) {
  const [taskShow, setTaskShow] = React.useState(0)

  const changeTaskShow = (value) => {
    if (taskShow + value < tasks.length && taskShow + value >= 0) {
      setTaskShow(taskShow + value)
    }
  }

  // --------------- IF TILE HAS NO TASKS, RETURN EMPTY TILE --------------------

  if (tasks.length == 0) {
    return (
      <div className='tile-container empty-tile animate__animated animate__fadeIn'>
        <TileStatusSelect status={status} id={id} changeTileStatus={changeTileStatus} />
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


  // --------------- IF TILE HAS TASKS, RETURN TASKLIST--------------------

  return (
    <div className='tile-container animate__animated animate__fadeIn'>
      <TileStatusSelect status={status} id={id} changeTileStatus={changeTileStatus} />
      <div className='edit-tile-buttons'>
        <Link to={`/tiles/${id}/newtask`}><AddCircleOutlineIcon className='icon-sml' /></Link>
        <DeleteIcon className='icon-sml' onClick={() => { deleteTile(id) }} />
      </div>
      <img className='tile-image' src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1605042317/stream-5680609_640_uwhrlw.jpg' />
      <span className='task-number'>{taskShow + 1}/{tasks.length}</span>
      <div className='title-details'>
        {taskShow !== 0 ? <ChevronLeftIcon className='change-task-arrow left-arrow icon-arrows' onClick={() => changeTaskShow(-1)} /> : ''}
        {taskShow + 1 < tasks.length ? <ChevronRightIcon className='change-task-arrow right-arrow icon-arrows' onClick={() => changeTaskShow(1)} /> : ''}
        <p className='task-title'>{tasks[taskShow].title}</p>
        <p className='task-type'>{taskTypes[tasks[taskShow].task_type]}</p>
      </div>

      <Link className='btn view-button' to={`/${tasks[taskShow].id}`}>VIEW</Link>
      <LaunchDate id={id} launch_date={launch_date} updateTileDate={updateTileDate} />
    </div>
  )
}

export default Tile