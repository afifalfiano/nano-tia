import App from '../App';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../pages/Error';
import { WrapInfo } from '../components';
import { Suspense } from 'react';

const LazyDetailPost = React.lazy(() => import('../pages/DetailPost'));
const LazyFavoritArticlesPage = React.lazy(() => import('../pages/FavoritArticlesPage'));

const LazyDetailPostWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrapInfo>
        <LazyDetailPost/>
      </WrapInfo>
    </Suspense>
  )
}

const LazyFavoritArticlesPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrapInfo>
        <LazyFavoritArticlesPage/>
      </WrapInfo>
    </Suspense>
  )
}

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <WrapInfo><App /></WrapInfo>,
    errorElement: <WrapInfo><ErrorPage /></WrapInfo>,
  },
  {
    path: '/post/:slug',
    element: <LazyDetailPostWrapper />,
    errorElement: <WrapInfo><ErrorPage /></WrapInfo>,
  },
  {
    path: '/favorit-articles',
    element: <LazyFavoritArticlesPageWrapper />,
    errorElement: <WrapInfo><ErrorPage /></WrapInfo>,
  }
]);

export default Routes;