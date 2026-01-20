import React from 'react'
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromMangaWatchlist } from '../Redux/aniMangaSlice';

function MangaWatchlist() {
    const dispatch = useDispatch();

  const MangaWatchlist = useSelector(
    (state) => state.aniManga.MangaWatchlist
  );
  
  return (
    <>
    <Header />
    <div>
      <input type="text" className='anime_search' placeholder='Enter Manga Name'/>
      <div className='anime_container'>{MangaWatchlist.map(manga=>(
        <div key={manga.mal_id} className='single_manga_container'>
          <div className='anime_images_container'><img className='anime_images' src={manga.images.jpg.image_url} alt="Mangas" /></div><br />
          <h3 className='anime_titles'>{manga.title}</h3><br />
          <div className='anime_rating'><p>Type:{manga.type}</p></div><br />
          <div className='watchlist_btn_container'><button className='watchlist_btn' onClick={()=>dispatch(removeFromMangaWatchlist(manga))}>Remove From Manga WatchList</button></div>
        </div>
))}
      </div>
    </div>
    </>
  )
}

export default MangaWatchlist
