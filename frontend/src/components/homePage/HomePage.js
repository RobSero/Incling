import React from 'react'
import { getTilesByStatusRequest, createTileRequest, deleteTileRequest, updateTileLaunchDateRequest } from '../../utils/api'

import HeaderSection from './HeaderSection'
import FilterOptions from './FilterOptions'
import NewTile from './NewTile'
import Tile from './Tile'
import { message } from 'antd';


function HomePage() {
  const [allTiles, setTiles] = React.useState([])
  const [filteredTileStatus, setTileFilter] = React.useState(0)

  const getTilelist = async (status) => {
    try {
      const response = await getTilesByStatusRequest(status)
      setTiles(response.data)
    } catch (err) {
      console.log(err.response);
    }
  }




  //  ------------------  ON MOUNT FUNCTION ------------------------
  React.useEffect(() => {
    getTilelist(filteredTileStatus)
  }, [filteredTileStatus])


  const filterTiles = (status) => {
    setTileFilter(status)
  }

  const localTileFilter = (tileId) => {
    if (filteredTileStatus !== 4) {
      const filteredTiles = allTiles.filter(tile => {
        if (tile.id !== tileId) { return tile }
      })
      setTiles(filteredTiles)
    }
  }


  const createTile = async () => {
    try {
      await createTileRequest(filteredTileStatus)
      getTilelist(filteredTileStatus)
      message.success('Tile Created!');
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
    }

  }

  const deleteTile = async (tileId) => {
    try {
      await deleteTileRequest(tileId)
      getTilelist(filteredTileStatus)
    } catch (err) {
      console.log(err);
      message.error('Failed, please try again');
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
            return <Tile key={tile.id} {...tile} deleteTile={deleteTile} localTileFilter={localTileFilter} updateTileDate={updateTileDate} />
          })}
          { filteredTileStatus !== 4 ? <NewTile createTile={createTile} /> : ''}
          
        </div>
      </div>
    </div>

  )
}


export default HomePage