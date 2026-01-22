import React, { useContext } from 'react'
import Header from './Header'
import {Link} from "react-router-dom"


function Homepage() { 
  return (
    <>
      <Header/>
      <div id='aniManga_buttons'>
        <Link to="/anime"><button id='getAnime'>Anime</button></Link>
      <Link to="/manga"><button id='getManga'>Manga</button></Link></div>
    </>
  )
}

export default Homepage