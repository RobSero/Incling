import React from 'react'
import { useParams, Redirect, Link } from "react-router-dom";
import {createTaskRequest} from '../../utils/api'



function NewTaskPage(props) {
  const {tileId} = useParams()
  const [task, setTask] = React.useState({
    title: '',
    description: '',
    task_type: 0,
    tile: tileId
  })
  

const userInput = (event) => {
  const inputValue = event.target.value
  const inputName = event.target.name
  console.log(inputValue);
  console.log(inputName);
  setTask({...task, [inputName] : inputValue})
}

const submitTask = async(e) => {
  console.log(e);
  e.preventDefault()
  await createTaskRequest(task)
  props.history.push('/');
}


  return (
    <>
    <div className='task-section'> 
    <h1>New Task</h1>
    </div>
    <br />
    <div className='description-section'>
    <form onSubmit={submitTask}>
    <label>Task Title</label>
    <br />
    <input className='task-input' type='text' name='title' onChange={userInput} value={task.title} />
    <br />
    <label>Task Description</label>
    <br />
    <textarea className='task-input text-area' name='description' type='textarea' onChange={userInput} value={task.description}   />
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
      <button className='btn submit-button' type='submit'>Create Task</button>
      </form>
    </div>

    
</>
  )
}


export default NewTaskPage