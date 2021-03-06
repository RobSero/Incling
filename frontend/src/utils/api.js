import axios from 'axios'


//  ------------------------------------------------------
//                    TILE API REQUESTS
//  ------------------------------------------------------

  export const getTilesByStatusRequest = async (status) => {
      return await axios.get(`/api/tiles/status/${status}/`)
  }


  export const createTileRequest = async (currentTileStatus) => {
      return await axios.post('/api/tiles/', { status: currentTileStatus })
  }

  export const deleteTileRequest = async (tileId) => {
      return await axios.delete(`/api/tiles/${tileId}/`)
  }

  export const changeTileStatusRequest = async (tileId, newStatus) => {
      return await axios.patch(`/api/tiles/${tileId}/`, { status: newStatus })
  }

  export const updateTileLaunchDateRequest = async (tileId, newDate) => {
      return await axios.patch(`/api/tiles/${tileId}/`, { launch_date: newDate })
  }

  export const updateTileTaskOrderRequest = async (tileId, newTaskOrder) => {
    return await axios.patch(`/api/tiles/${tileId}/`, { task_order: newTaskOrder })
}

//  ------------------------------------------------------
//                    TASK API REQUESTS
//  ------------------------------------------------------

  export const getTaskRequest = async (tileId) => {
      return await axios.get(`/api/tasks/${tileId}/`)
  }


  export const deleteTaskRequest = async (tileId) => {
      return await axios.delete(`/api/tasks/${tileId}/`)
  } 

  export const createTaskRequest = async (taskData) => {
      return await axios.post('/api/tasks/', taskData)
  }


  export const updateTaskRequest = async (taskData) => {
      return await axios.patch(`/api/tasks/${taskData.id}/`, taskData)
  }