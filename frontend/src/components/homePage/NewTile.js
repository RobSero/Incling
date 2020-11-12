import React from 'react'


function NewTile(props) {
  return (
    <div className='tile-container new-tile'>
      <button className='new-button' onClick={props.createTile}>CREATE A NEW TILE HERE</button>
  </div>
  )
}

export default NewTile