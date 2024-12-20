import React from 'react'
import Intro from '../Components/Home/Intro'
import Service from '../Components/Home/Service'
import Feature from '../Components/Home/Feature'

const Home = () => {
  return (
    <div className='px-5'>
      <Intro/>
      <Service/>
      <Feature/>
    </div>
  )
}

export default Home