import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {CONSTANT, PATH_API} from '../common';

export const listArticlesApi = createApi({
  reducerPath: 'listArticlesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: CONSTANT.BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      headers.set('Access-Control-Allow-Credentials', 'Authorization, X-WP-Nonce, Content-Disposition, Content-MD5, Content-Type');
      return headers;
    } 
  }),
  mode: 'no-cors',
  endpoints: (builder) => ({
    getPostLists: builder.query({
      query: () => PATH_API.POSTS,
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetPostListsQuery } = listArticlesApi