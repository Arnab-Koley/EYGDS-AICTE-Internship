import React from 'react'
import MyListings from '../Components/Listings/MyListings'
import { useNavigate } from 'react-router-dom'

const Listings = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MyListings/>
    </div>
  )
}

export default Listings