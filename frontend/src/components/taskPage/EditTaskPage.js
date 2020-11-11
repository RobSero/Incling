import React from 'react'
import { useParams, Redirect, Link } from "react-router-dom";
import { getTaskRequest, updateTaskRequest, deleteTaskRequest } from '../../utils/api'
import DeleteIcon from '@material-ui/icons/Delete';
import { message } from 'antd';
import { taskTypes } from '../../utils/taskTypes'

function EditTaskPage(props) {
  const { taskId } = useParams()
  const [task, setTask] = React.useState()

  React.useEffect(() => {
    const getTask = async (taskId) => {
      try {
        const response = await getTaskRequest(taskId)
        setTask(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getTask(taskId)
  }, [])


  const userInput = ({ target }) => {
    const inputValue = target.value
    const inputName = target.name
    setTask({ ...task, [inputName]: inputValue })
  }

  
  const submitTask = async (e) => {
    e.preventDefault()
    try {
      await updateTaskRequest(task)
      message.success('Task Updated!');
      props.history.push('/');
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
    }

  }

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskRequest(taskId)
      props.history.push('/');
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
    }

  }


  if (!task) {
    return null
  }

  return (
    <div className='task-container'>
      <div className='task-section animate__animated animate__fadeIn'>
        <h1>Update Task</h1>
        <div className='task-options'>
          <DeleteIcon className='icon-large' onClick={() => { deleteTask(task.id) }} />
        </div>
      </div>
      <br />
      <div className='description-section animate__animated animate__fadeIn'>
        <form onSubmit={submitTask}>
          <label>Task Title</label>
          <br />
          <input className='task-input' type='text' name='title' onChange={userInput} value={task.title} />
          <br />
          <label>Task Description</label>
          <br />
          <textarea className='task-input text-area' name='description' type='textarea' onChange={userInput} value={task.description} />
          <br />
          <label>Task Type</label>
          <br />
          <select className='task-type-input' name='task_type' onChange={userInput} value={task.task_type} >
            <option value='0'>Unnassigned</option>
            <option value='1'>Survey</option>
            <option value='2'>Discussion</option>
            <option value='3'>Diary</option>
          </select>
          <br />
          <button className='btn submit-button' type='submit'>Update Task</button>
        </form>

      </div>


    </div>
  )
}


export default EditTaskPage

