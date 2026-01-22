import React from 'react'
import Header from './Header';
import { useSelector,useDispatch } from 'react-redux';
import { addToAnimeList, addToAnimeWatchlist } from '../Redux/aniMangaSlice';
import { fetchAnime } from '../Redux/aniMangaSlice';
import { useEffect } from 'react';

function Anime() {

  const dispatch = useDispatch();
  const {AnimeList,isLoading,HasMoreAnime} = useSelector(anime=>anime.aniManga)
  const AnimeWatchlist = useSelector(anime=>anime.aniManga.AnimeWatchlist)
  useEffect(()=>{
  dispatch(fetchAnime());
},[dispatch])

useEffect(()=>{
  const handleScroll =()=>{
    const nearBottom = 
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

    if(nearBottom &&  !isLoading && HasMoreAnime){
      dispatch(fetchAnime())
    }
  };
      window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
},[dispatch, isLoading, HasMoreAnime])
  return (
    <>
    <Header />
    <div>
      <div className='anime_container'>
        {AnimeList.map(anime=>{
        const isInWatchlist = AnimeWatchlist.some((anime1)=>anime1.mal_id === anime.mal_id)
        return(
        <div key={anime.mal_id} className='single_anime_container'>
          <div className='anime_images_container'><img className='anime_images' src={anime.images.jpg.image_url} alt="Animes" /></div><br />
          <h3 className='anime_titles'>{anime.title}</h3><br />
          <span className='anime_genres_container'>{anime.genres.map(genre=>(
            <p key={genre.mal_id} className='anime_genres'>{genre.name}</p>))}</span><br />
          <p className='anime_synopsis'>{anime.synopsis}</p><br />
          <div className='anime_rating'><p>Ratings:{anime.score}</p></div><br />
          <div className='watchlist_btn_container'><button disabled={isInWatchlist}className='watchlist_btn' onClick={()=>dispatch(addToAnimeWatchlist(anime))}><h3>{isInWatchlist?("Added To Anime WatchList"):("Add To Anime WatchList")}</h3></button></div>
        </div>)
        
      })}
      </div>
            {isLoading && <h3 style={{ textAlign: "center" }}>Loading more...</h3>}
      {!HasMoreAnime && <h3 style={{ textAlign: "center" }}>No more Anime</h3>}
    </div>
    </>
  )
}

export default Anime
