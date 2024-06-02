import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  articles: []
}

export const favoritArticles = createSlice({
  name: 'favoritArticles',
  initialState,
  reducers: {
    addToFavorit: (state, action) => {
        const alreadyAdded = state.articles.some(item => +item.id === +action?.payload?.post?.id);
        if (!alreadyAdded) {
          state.articles.push(action?.payload?.post);          
        }
    },
    removeFromFavorit: (state, action) => {
      const idx = state.articles.findIndex(item => +item.id === +action?.payload?.post?.id);
      console.log(idx)
      if (idx > -1) {
        state.articles.splice(idx, 1);          
      }
    }
  },
})

export const { addToFavorit, removeFromFavorit } = favoritArticles.actions
export const selectFavoritArticles = (state) => state.favoritArticles;
export default favoritArticles.reducer