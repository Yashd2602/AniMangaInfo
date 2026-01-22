import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

function AniMangaWatchlist() {

  return (
   <>
   <Header/>
   <div className='animanga_watchlist_btn_container'>
      <Link to="/animewatchlist"><button className='animanga_watchlist_btn'>Anime Watchlist</button></Link>
      <Link to="/mangawatchlist"><button className='animanga_watchlist_btn'>Manga Watchlist</button></Link>
    </div></> 
  )
}

export default AniMangaWatchlist
