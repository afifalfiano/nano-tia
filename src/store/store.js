import { configureStore } from '@reduxjs/toolkit'
import readLimit from './features/read-limit/readLimitSlice';
import { listArticlesApi } from '../services/list-articles';
import { setupListeners } from '@reduxjs/toolkit/query';
import favoritArticles from './features/favorit-articles/favoritArticlesSlice';

export const store = configureStore({
  reducer: {
    readLimit: readLimit,
    favoritArticles: favoritArticles
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listArticlesApi.middleware),
})

setupListeners(store.dispatch)
