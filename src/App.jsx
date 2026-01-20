import React,{ useState } from 'react'
import Homepage from './Components/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Anime from './Components/Anime'
import Manga from './Components/Manga'
import AniMangaWatchlist from './Components/AniMangaWatchlist.jsx'
import AnimeWatchlist from './Components/AnimeWatchlist'
import MangaWatchlist from './Components/MangaWatchlist'

function App() {
  const router = createBrowserRouter([
{path:"/",
  element:<Homepage />},
{path:"/anime",
  element:<Anime />},
{path:"/manga",
  element:<Manga />},
{path:"/animangawatchlist",
  element:<AniMangaWatchlist />},
{path:"/animewatchlist",
  element:<AnimeWatchlist />},
{path:"/mangawatchlist",
  element:<MangaWatchlist />},
],{basename: import.meta.env.DEV ? '/' : '/Watchlist-App'})

  return (
    <RouterProvider router={router}/>
  )
}

export default App
