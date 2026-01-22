import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const loadFromLocalStorage = (key)=>{
    try{
        const data = localStorage.getItem(key);
        return data? JSON.parse(data):[]
    }catch{
        return [];
    }
}
const saveToLocalStorage = (key,data)=>{
    localStorage.setItem(key,JSON.stringify(data))
}

const initialState ={
    AnimeList:[],
    MangaList:[],
    AnimeWatchlist:loadFromLocalStorage("AnimeWatchlist"),
    MangaWatchlist:loadFromLocalStorage("MangaWatchlist"),
    AnimePage:1,
    MangaPage:1,
    HasMoreAnime:true,
    HasMoreManga:true,
    isLoading:false,
    error:null,
}

const aniMangaSlice = createSlice({
    name:"aniManga",
    initialState,
    reducers:{
        addToAnimeList:(state,action) =>{
            state.AnimeList.push(action.payload);
            
        },
        addToMangaList:(state,action) =>{
            state.MangaList.push(action.payload)
        },
        addToAnimeWatchlist:(state,action) =>{
            state.AnimeWatchlist.push(action.payload);
            saveToLocalStorage("AnimeWatchlist",state.AnimeWatchlist);
        },
        addToMangaWatchlist:(state,action) =>{
            state.MangaWatchlist.push(action.payload);
            saveToLocalStorage("MangaWatchlist",state.MangaWatchlist);
        },
        removeFromAnimeWatchlist:(state,action) =>{
            state.AnimeWatchlist=state.AnimeWatchlist.filter((anime)=>(
                anime.mal_id!==action.payload.mal_id
            ));
            saveToLocalStorage("AnimeWatchlist",state.AnimeWatchlist);
        },
        removeFromMangaWatchlist:(state,action) =>{
            state.MangaWatchlist=state.MangaWatchlist.filter((manga)=>(
                manga.mal_id!==action.payload.mal_id
            ));
            saveToLocalStorage("MangaWatchlist",state.MangaWatchlist);
        },
    },
        extraReducers:(builder)=>{
            builder
            .addCase(fetchAnime.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(fetchAnime.fulfilled,(state,action)=>{
                state.isLoading = false;         
      if (action.payload.length === 0) {
        state.HasMoreAnime = false;
      } else {
        state.AnimeList.push(...action.payload);
        state.AnimePage += 1;
      }
            })
            .addCase(fetchAnime.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.error.message
            })
            .addCase(fetchManga.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(fetchManga.fulfilled,(state,action)=>{
                state.isLoading = false;      
      if (action.payload.length === 0) {
        state.HasMoreManga = false;
      } else {
        state.MangaList.push(...action.payload);
        state.MangaPage += 1;
      }
            })
            .addCase(fetchManga.rejected,(state,action)=>{
                state.isLoading = false;
                state.error = action.error.message
            })
        }
})

export const fetchAnime = createAsyncThunk(
    "aniManga/fetchAnime",
    async (_,{ getState})=>{
        const {AnimePage} = getState().aniManga;
        const results = await axios.get(`https://api.jikan.moe/v4/anime?page=${AnimePage}&order_by=popularity&type=tv`);
        return results.data.data;
    }
)
export const fetchManga = createAsyncThunk(
    "aniManga/fetchManga",
    async (_,{getState})=>{
        const {MangaPage} = getState().aniManga;
        const results = await axios.get(`https://api.jikan.moe/v4/manga?page=${MangaPage}&order_by=popularity`);
        return results.data.data;
    }
)

export const {
    addToAnimeList,
    addToMangaList,
    addToAnimeWatchlist,
    addToMangaWatchlist,
    removeFromAnimeWatchlist,
    removeFromMangaWatchlist,
} =aniMangaSlice.actions

export default aniMangaSlice.reducer;