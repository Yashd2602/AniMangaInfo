import React from 'react'
import Header from './Header';
import { removeFromAnimeWatchlist } from '../Redux/aniMangaSlice';
import { useDispatch, useSelector } from 'react-redux';

function AnimeWatchlist() {
    const dispatch = useDispatch();

  const AnimeWatchlist = useSelector(
    (state) => state.aniManga.AnimeWatchlist
  );
  
   return(<>
    <Header />
    <div>
      <input type="text" className='anime_search' placeholder='Enter Anime Name'/>
      <div className='anime_container'>{AnimeWatchlist.map(anime=>(
        <div key={anime.mal_id} className='single_anime_container'>
          <div className='anime_images_container'><img className='anime_images' src={anime.images.jpg.image_url} alt="Animes" /></div><br />
          <h3 className='anime_titles'>{anime.title}</h3><br />
          <span className='anime_genres_container'>{anime.genres.map(genre=>(
            <p key={genre.mal_id} className='anime_genres'>{genre.name}</p>))}</span><br />
          <p className='anime_synopsis'>{anime.synopsis}</p><br />
          <div className='anime_rating'><p>Ratings:{anime.score}</p></div><br />
          <div className='watchlist_btn_container'><button className='watchlist_btn' onClick={()=>dispatch(removeFromAnimeWatchlist(anime))}>Remove From Watchlist</button></div>
        </div>
        
      ))}
      </div>
    </div>
    </>
   )
}

export default AnimeWatchlist
