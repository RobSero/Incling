import React from 'react'

//  Third party imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function LaunchDate({ id, launch_date, updateTileDate }) {
  return (
    <span className='tile-date'>Launch Date:<DatePicker className='date-picker' selected={new Date(launch_date)} onChange={date => updateTileDate(id, date)} /></span>
  )
}

export default LaunchDate