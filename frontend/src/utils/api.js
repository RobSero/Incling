import axios from 'axios'
  // ------------------  TILE CRUD FUNCTIONS ------------------------


  export const getTilesByStatusRequest = async (status) => {
    try {
      return await axios.get(`/api/tiles/status/${status}`)
    } catch (err) {
      console.log(err);
    }
  }


  export const createTileRequest = async (currentTileStatus) => {
    try {
      return await axios.post('/api/tiles/', { status: currentTileStatus })
    } catch (err) {
      console.log(err);
    }
  }

  export const deleteTileRequest = async (tileId) => {
    try {
      return await axios.delete(`/api/tiles/${tileId}`)
    } catch (err) {
      console.log(err);
    }
  }

  export const changeTileStatusRequest = async (tileId, newStatus) => {
    try {
      console.log('CHANGING STATUS');
      return await axios.patch(`/api/tiles/${tileId}/`, { status: newStatus })
    } catch (err) {
      console.log(err);
    }
  }

  export const updateTileLaunchDateRequest = async (tileId, newDate) => {
    try {
      console.log('CHANGING STATUS');
      return await axios.patch(`/api/tiles/${tileId}/`, { launch_date: newDate })
    } catch (err) {
      console.log(err);
    }
  }


  export const getTaskRequest = async (tileId) => {
    try {
      return await axios.get(`/api/tasks/${tileId}`)
    } catch (err) {
      console.log(err);
    }
  }


  export const deleteTaskRequest = async (tileId) => {
    try {
      return await axios.delete(`/api/tasks/${tileId}`)
    } catch (err) {
      console.log(err);
    }
  } 

  export const createTaskRequest = async (taskData) => {
    console.log(taskData);
    try {
      return await axios.post('/api/tasks/', taskData)
    } catch (err) {
      console.log(err);
    }
  }


  export const updateTaskRequest = async (taskData) => {
    console.log(taskData);
    try {
      return await axios.patch(`/api/tasks/${taskData.id}/`, taskData)
    } catch (err) {
      console.log(err);
    }
  }