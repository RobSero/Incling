import React from 'react'
import {Link} from 'react-router-dom'

//  Third party imports
import HomeIcon from '@material-ui/icons/Home';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AppleIcon from '@material-ui/icons/Apple';
import AssignmentIcon from '@material-ui/icons/Assignment';

function Navbar() {
  return (
    <nav>
      <div className='user-details'>
       <Link to='/'><HomeIcon className='nav-item' /></Link>
        <AirplanemodeActiveIcon className='nav-item' />
      </div>
      <div className='search-fields'>
      <AppleIcon className='nav-item' />
        <AssignmentIcon className='nav-item' />
      </div>
    </nav>
  )
}

export default Navbar