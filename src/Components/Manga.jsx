import React from 'react'
import Header from './Header';
import { addToMangaWatchlist, fetchManga } from '../Redux/aniMangaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Manga() {

  const dispatch = useDispatch();
  const {MangaList,isLoading,HasMoreManga} = useSelector(manga=>manga.aniManga)
  const MangaWatchlist = useSelector(manga=>manga.aniManga.MangaWatchlist)
  useEffect(()=>{
  dispatch(fetchManga());
},[dispatch])

useEffect(()=>{
  const handleScroll =()=>{
    const nearBottom = 
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

    if(nearBottom &&  !isLoading && HasMoreManga){
      dispatch(fetchManga())
    }
  };
      window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
},[dispatch, isLoading, HasMoreManga])
  return (
    <>
    <Header />
    <div>
      <input type="text" className='anime_search' placeholder='Enter Manga Name'/>
      <div className='anime_container'>
        {MangaList.map(manga=>{
          const isInWatchlist = MangaWatchlist.some((manga1)=>manga1.mal_id === manga.mal_id)
        return(
        <div key={manga.mal_id} className='single_manga_container'>
          <div className='anime_images_container'><img className='anime_images' src={manga.images.jpg.image_url} alt="Mangas" /></div><br />
          <h3 className='anime_titles'>{manga.title}</h3><br />
          <div className='anime_rating'><p>Type:{manga.type}</p></div><br />
          <div className='watchlist_btn_container'><button disabled={isInWatchlist}className='watchlist_btn' onClick={()=>dispatch(addToMangaWatchlist(manga))}><h3>{isInWatchlist?("Added To Manga WatchList"):("Add To Manga WatchList")}</h3></button></div>
        </div>)
        
        })}
      </div>
            {isLoading && <h3 style={{ textAlign: "center" }}>Loading more...</h3>}
      {!HasMoreManga && <h3 style={{ textAlign: "center" }}>No more Manga</h3>}
    </div>
    </>
  )
}

export default Manga
