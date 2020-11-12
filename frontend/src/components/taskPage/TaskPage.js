import React from 'react'
import { useParams, Link } from "react-router-dom";

// Utility & API Imports
import { getTaskRequest, deleteTaskRequest } from '../../utils/api'
import { taskTypes } from '../../utils/taskTypes'

// Third Party Imports
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

/* ------------------------------------------------
               VIEW TASK PAGE VIEW
--------------------------------------------------*/
function TaskPage(props) {
  const [task, setTask] = React.useState()
  const { taskId } = useParams()

//  Get task on mount
  React.useEffect(() => {
    const getTask = async (taskId) => {
      const response = await getTaskRequest(taskId)
      setTask(response.data)
    }
    getTask(taskId)
  }, [taskId])

  const deleteTask = async (taskId) => {
    await deleteTaskRequest(taskId)
    props.history.push('/');
  }

  if (!task) {
    return null
  }

  return (
    <div className='task-container'>
      <div className='task-section  animate__animated animate__fadeIn'>
        <h4>{taskTypes[task.task_type]}</h4>
        <h1>{task.title}</h1>
        <p>created on {new Date(task.created_at).toLocaleDateString()}</p>
        <div className='task-options'>
          <Link to={`/${task.id}/update`}><EditIcon className='icon-large' /></Link>
          <DeleteIcon className='icon-large' onClick={() => { deleteTask(task.id) }} />
        </div>
      </div>
      <br />
      <div className='description-section  animate__animated animate__fadeIn'>
        <p className='task-description-header'>Task Overview</p>
        <p className='task-description'>{task.description}</p>
      </div>
    </div>
  )
}

export default TaskPage