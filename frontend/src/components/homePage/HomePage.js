import React from 'react'

// API Imports
import { getTilesByStatusRequest, createTileRequest, deleteTileRequest, updateTileLaunchDateRequest } from '../../utils/api'

// Component Imports
import FilterOptions from './FilterOptions'
import HeaderSection from './HeaderSection'
import NewTile from './NewTile'
import Tile from './Tile'

// Third Party Imports
import { message } from 'antd';

/* ------------------------------------------------
               MAIN TILE INDEX VIEW
--------------------------------------------------*/
function HomePage() {
  const [allTiles, setTiles] = React.useState([])
  const [currentTileStatus, setTileStatusFilter] = React.useState(0)

  // get tiles based on the selected tile status tab 
  const getTilelist = async (status) => {
    try {
      const response = await getTilesByStatusRequest(status)
      setTiles(response.data)
    } catch (err) {
      console.log(err.response);
    }
  }

  // Get live status tiles on component mount
  React.useEffect(() => {
    getTilelist(currentTileStatus)
  }, [currentTileStatus])


  const filterTiles = (status) => {
    setTileStatusFilter(status)
  }

  // Locally filter tiles away when changed rather than fetching all tiles again, reduce http requests
  const localTileFilter = (tileId) => {
    if (currentTileStatus !== 4) {
      const filteredTiles = allTiles.filter(tile => {
        if (tile.id !== tileId) return tile
      })
      setTiles(filteredTiles)
    }
  }

  const createTile = async () => {
    try {
      const newTile = await createTileRequest(currentTileStatus)
      setTiles([...allTiles, newTile.data])
      message.success('Tile Created!');
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
    }
  }

  const deleteTile = async (tileId) => {
    try {
      await deleteTileRequest(tileId)
      getTilelist(currentTileStatus)
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
    }
  }

  const updateTileDate = async (tileId, newDate) => {
    await updateTileLaunchDateRequest(tileId, newDate.toISOString())
    try {
      const response = await getTilesByStatusRequest(currentTileStatus)
      setTiles(response.data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <HeaderSection />
      <div className='responsive-container'>
        <FilterOptions currentTileStatus={currentTileStatus} filterTiles={filterTiles} />
        {/* CARD SECTION */}
        <div className='tile-flex-container'>
          {allTiles.map(tile => {
            return <Tile key={tile.id} {...tile} deleteTile={deleteTile} localTileFilter={localTileFilter} updateTileDate={updateTileDate} />
          })}
          {/* NEW TILE CARD - NOT VISIBLE ON 'ALL' TAB */}
          {currentTileStatus !== 4 ? <NewTile createTile={createTile} /> : ''}
        </div>
      </div>
    </div>

  )
}


export default HomePage