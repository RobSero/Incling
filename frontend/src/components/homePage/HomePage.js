import React from 'react'
import { getTilesByStatusRequest, createTileRequest, deleteTileRequest, changeTileStatusRequest, updateTileLaunchDateRequest } from '../../utils/api'

import HeaderSection from './HeaderSection'
import FilterOptions from './FilterOptions'
import NewTile from './NewTile'
import Tile from './Tile'



function HomePage() {
  const [allTiles, setTiles] = React.useState([])
  const [filteredTileStatus, setTileFilter] = React.useState(0)

  const getTilelist = async (status) => {
    const response = await getTilesByStatusRequest(status)
    setTiles(response.data)
  }




  //  ------------------  ON MOUNT FUNCTION ------------------------
  React.useEffect(() => {
    getTilelist(filteredTileStatus)
  }, [filteredTileStatus])


  const filterTiles = (status) => {
    setTileFilter(status)
  }

  const localTileFilter = (tileId) => {
    const reducedArray = allTiles.filter(tile => {
      if (tile.id !== tileId) {return tile}
    })
    setTiles(reducedArray)
  }


  const createTile = async() => {
    await createTileRequest(filteredTileStatus)
    getTilelist(filteredTileStatus)
  }

  const deleteTile = async(tileId) => {
    await deleteTileRequest(tileId)
    localTileFilter(tileId)
  }

  const changeTileStatus = async(tileId, event) => {
    const newStatus = event.target.value
    await changeTileStatusRequest(tileId, newStatus)
    if(filteredTileStatus !== 4){
      localTileFilter(tileId)
    }
  }

  const updateTileDate = async (tileId, newDate) => {
    await updateTileLaunchDateRequest(tileId, newDate.toISOString())
    const response = await getTilesByStatusRequest(filteredTileStatus)
    setTiles(response.data)
  }

  return (
    <div>
      <HeaderSection />
      <div className='responsive-container'>
        <FilterOptions filteredTileStatus={filteredTileStatus} filterTiles={filterTiles} />
        {/* CARD SECTION */}
        <div className='tile-flex-container'>
          {allTiles.map(tile => {
            return <Tile key={tile.id} {...tile} deleteTile={deleteTile} changeTileStatus={changeTileStatus} updateTileDate={updateTileDate} />
          })}
          <NewTile createTile={createTile} />
        </div>
      </div>
    </div>

  )
}


export default HomePage