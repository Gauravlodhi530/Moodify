import { useState } from 'react'
import FacialExpression from "./FacialExpression"
// import './App.css'
import MoodSongs from './MoodSongs'
import React from 'react'

function Home() {    

  const [ Songs, setSongs ] = useState([
       
    ])

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs Songs={Songs} />
    </>
  )
}

export default Home;