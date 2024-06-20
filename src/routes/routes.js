import App from '../App';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { WrapInfo } from '../components';
import { Suspense } from 'react';

const LazyDetailPost = React.lazy(() => import('../pages/DetailPost'));
const LazyFavoritArticlesPage = React.lazy(() => import('../pages/FavoritArticlesPage'));
const LazyErrorPage = React.lazy(() => import('../pages/Error'));

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

const LazyErrorPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WrapInfo>
        <LazyErrorPage/>
      </WrapInfo>
    </Suspense>
  )
}

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <WrapInfo><App /></WrapInfo>,
    errorElement: <LazyErrorPageWrapper />,
  },
  {
    path: '/post/:slug',
    element: <LazyDetailPostWrapper />,
    errorElement: <LazyErrorPageWrapper />,
  },
  {
    path: '/favorit-articles',
    element: <LazyFavoritArticlesPageWrapper />,
    errorElement: <LazyErrorPageWrapper />,
  }
]);

export default Routes;