import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Utility & API Imports
import { updateTileTaskOrderRequest, changeTileStatusRequest } from '../../utils/api'
import { taskTypes } from '../../utils/taskTypes'

// Component Imports
import EmptyTile from './EmptyTile'
import LaunchDate from '../common/LaunchDate'
import TaskOrderModal from '../common/TaskOrderModal'
import TileStatusSelect from '../common/TileStatusSelect'

// Third Party Imports
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import { message } from 'antd';

/* ------------------------------------------------
                  TILE COMPONENT
--------------------------------------------------*/
function Tile({ tasks, id, launch_date, status, deleteTile, updateTileDate, localTileFilter }) {
  const [taskIndex, setTaskIndex] = React.useState(0)
  const [taskList, setTaskList] = React.useState(tasks)
  const [currentStatus, setStatus] = React.useState(status)

  // switches between tasks in tile
  const changeTaskShow = (value) => {
    if (taskIndex + value < taskList.length && taskIndex + value >= 0) { // check that index will not be out of range of array
      setTaskIndex(taskIndex + value)
    }
  }

  const updateTaskOrder = async (newTaskOrder) => {
    try {
      const response = await updateTileTaskOrderRequest(id, newTaskOrder)
      setTaskList(response.data.tasks)
    } catch (err) {
      console.log(err);
    }
  }

  const changeTileStatus = async (tileId, { target }) => {
    const newStatus = target.value
    try {
      await changeTileStatusRequest(tileId, newStatus)
      setStatus(newStatus) // locally update Tile status
      message.success('Changed Tile Status');
      localTileFilter(id) // locally move task out of current status tab, new data will be fetched when status tab changes
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
    }
  }

  // --------------- IF TILE HAS NO TASKS, RETURN EMPTY TILE --------------------
  if (taskList.length === 0) {
    return (
      <EmptyTile
        id={id}
        launch_date={launch_date}
        updateTileDate={updateTileDate}
        deleteTile={deleteTile}
        currentStatus={currentStatus}
        changeTileStatus={changeTileStatus} />
    )
  }


  // --------------- IF TILE HAS TASKS, RETURN TASKLIST--------------------
  return (
    <div className='tile-container animate__animated animate__fadeIn'>
      <TileStatusSelect currentStatus={currentStatus} id={id} changeTileStatus={changeTileStatus} />
      {/* EDIT BUTTONS */}
      <div className='edit-tile-buttons'>
        <Link to={`/tiles/${id}/newtask`}><AddCircleOutlineIcon className='icon-sml' /></Link>
        <DeleteIcon className='icon-sml' onClick={() => { deleteTile(id) }} />
      </div>
      <img className='tile-image' alt='random-pic' src='https://res.cloudinary.com/dy7eycl8m/image/upload/v1605042317/stream-5680609_640_uwhrlw.jpg' />
      {/* MODAL AND TASK ORDER */}
      <TaskOrderModal taskIndex={taskIndex} tasks={taskList} updateTaskOrder={updateTaskOrder} />
      {/* TASK TOGGLING ARROWS */}
      <div className='title-details'>
        {taskIndex !== 0 ? <ChevronLeftIcon className='change-task-arrow left-arrow icon-arrows' onClick={() => changeTaskShow(-1)} /> : ''}
        {taskIndex + 1 < taskList.length ? <ChevronRightIcon className='change-task-arrow right-arrow icon-arrows' onClick={() => changeTaskShow(1)} /> : ''}
        <p className='task-title'>{taskList[taskIndex].title}</p>
        <p className='task-type'>{taskTypes[taskList[taskIndex].task_type]}</p>
      </div>
      <Link className='btn view-button' to={`/${taskList[taskIndex].id}`}>VIEW</Link>
      <LaunchDate id={id} launch_date={launch_date} updateTileDate={updateTileDate} />
    </div>
  )
}

export default Tile

Tile.propTypes = {
  tasks: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  launch_date: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  deleteTile: PropTypes.func.isRequired,
  updateTileDate: PropTypes.func.isRequired
}