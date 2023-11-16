import React from 'react'
import { Link } from 'react-router-dom'

const ContestCardAdmin = ({ contest , index }) => {
 return (
  <div className="contestCard-container">
   <div className="contest-headings">
    <h2 className="contest-name">{contest.title}</h2>
   </div>
   <button className='manage-btn'><Link className='link' to={"/admin/contest/" + index}>Manage</Link></button>
  </div>
 )
}

export default ContestCardAdmin