import React from 'react'

function TileStatusSelect({status,id,changeTileStatus}) {
  return (
    <select value={status} className='tile-status' onChange={(e) => { changeTileStatus(id, e) }}>
    <option value='0'>Live</option>
    <option value='1'>Draft</option>
    <option value='2'>Pending</option>
    <option value='3'>Archived</option>
  </select>
  )
}

export default TileStatusSelect