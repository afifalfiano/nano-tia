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
      query: (params = {page: 1, perPage: 10}) => `${PATH_API.POSTS}?page=${params?.page}&per_page=${params?.perPage}`,
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetPostListsQuery } = listArticlesApi