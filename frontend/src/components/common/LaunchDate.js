import React from 'react'

//  Third party imports
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";



function LaunchDate({ id, launch_date, updateTileDate }) {
  return (
    <span className='tile-date'>Launch Date:<DatePicker className='date-picker' selected={new Date(launch_date)} onChange={date => updateTileDate(id, date)} /></span>
  )
}

export default LaunchDate