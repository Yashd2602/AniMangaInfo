import { configureStore } from "@reduxjs/toolkit";
import aniMangaReducer from "./aniMangaSlice"

export const store = configureStore({
    reducer:{
        aniManga: aniMangaReducer,
    }
})